import { AccountTokenAuthProvider, LightsparkClient, InvoiceType } from "@lightsparkdev/lightspark-sdk";
import { NextResponse } from "next/server";

// Configura o cliente Lightspark com as credenciais de API
const client = new LightsparkClient(
  new AccountTokenAuthProvider(
    process.env.LIGHTSPARK_API_CLIENT_ID as string,
    process.env.LIGHTSPARK_API_CLIENT_SECRET as string
  )
);

export async function POST(request: Request) {
  try {
    const { amount, memo } = await request.json();
    
    const nodeId = process.env.LIGHTSPARK_NODE_ID as string;
    if (!nodeId) {
      throw new Error("Node ID não configurado.");
    }

    const amountMsats = amount * 1000; // Convertendo para milli-satoshis

    // Cria um invoice no modo de teste
    const invoice = await client.createInvoice(nodeId, amountMsats, memo || "Teste de Pagamento definitivo", InvoiceType.STANDARD);
    
    if (!invoice) {
      throw new Error("Falha ao criar o invoice no modo de teste.");
    }

    console.log("Invoice gerado:", invoice);

    // Retorna o invoice gerado para o cliente
    return NextResponse.json({ invoice });
    
  } catch (error) {
    console.error("Erro ao criar invoice:", error);
    return NextResponse.json({ error: "Falha ao criar o invoice na Lightning Network." }, { status: 500 });
  }
}
