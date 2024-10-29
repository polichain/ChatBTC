import { NextResponse } from "next/server";
import { verifyAndParseWebhook, WebhookEventType } from "@lightsparkdev/lightspark-sdk";
import { messages } from "@/app/chatControl";


const WEBHOOK_SIGNING_KEY = process.env.LIGHTSPARK_WEBHOOK_SIGNING_KEY as string;

const invoiceToResponseMap: Record<string, string> = {};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const signature = request.headers.get("lightspark-signature");

        if (!signature) {
            return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
        }

        const event = await verifyAndParseWebhook(body, signature, WEBHOOK_SIGNING_KEY);

        if (event.event_type === WebhookEventType.PAYMENT_FINISHED) {
            const paymentId = event.entity_id;
            const invoice = body.invoice;  // Aqui você pode obter o invoice associado à transação

            console.log(`Pagamento confirmado. ID do pagamento: ${paymentId}`);

            // Verifica se o invoice tem uma resposta associada
            const responseText = invoiceToResponseMap[invoice];

            if (responseText) {
                // Libera a resposta ao usuário
                const timestamp = new Date().toLocaleTimeString();
                const newMessage = { text: responseText, timestamp, isSentByUser: false };

                messages.push(newMessage);  // Salva a resposta no histórico de mensagens
                delete invoiceToResponseMap[invoice];  // Remove o invoice da lista

                return NextResponse.json({ status: "Pagamento confirmado. Mensagem liberada." }, { status: 200 });
            } else {
                return NextResponse.json({ status: "Invoice não encontrado." }, { status: 404 });
            }
        }

        return NextResponse.json({ status: "Evento não processado." }, { status: 200 });
    } catch (error) {
        console.error("Erro ao processar o webhook da Lightspark:", error);
        return NextResponse.json({ error: "Erro ao processar o webhook." }, { status: 500 });
    }
}
