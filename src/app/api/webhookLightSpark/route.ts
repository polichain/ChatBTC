import { NextResponse } from "next/server";
import { verifyAndParseWebhook, WebhookEventType } from "@lightsparkdev/lightspark-sdk";

const WEBHOOK_SIGNING_KEY = process.env.LIGHTSPARK_WEBHOOK_SIGNING_KEY as string;

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

            console.log(`Pagamento confirmado. ID do pagamento: ${paymentId}`);

            return NextResponse.json({ status: "Pagamento confirmado. Mensagem liberada." }, { status: 200 });
        }

        return NextResponse.json({ status: "Evento não processado." }, { status: 200 });
    } catch (error) {
        console.error("Erro ao processar o webhook da Lightspark:", error);
        return NextResponse.json({ error: "Erro ao processar o webhook." }, { status: 500 });
    }
}
