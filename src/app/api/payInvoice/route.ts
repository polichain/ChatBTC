// Importa o SDK do LightSpark
import { LightsparkClient, AccountTokenAuthProvider } from "@lightsparkdev/lightspark-sdk";
import { NextResponse } from "next/server";

// Configura o cliente Lightspark com as credenciais de API
const client = new LightsparkClient(
  new AccountTokenAuthProvider(
    process.env.LIGHTSPARK_API_CLIENT_ID_USERTEST as string,
    process.env.LIGHTSPARK_API_CLIENT_TEST_SECRET as string
  )
);

export async function POST(request: Request) {
  try {
    const { encodedInvoice } = await request.json();
    console.log(encodedInvoice)
    const nodeId = process.env.LIGHTSPARK_NODE_ID_USERTEST as string;
    
    // Carregar a chave de assinatura do nó (necessário para pagar invoices)
    await client.loadNodeSigningKey(nodeId, { password: "1234!@#$" }); // Senha padrão para regtest/testnet
    
    // Pagar o invoice gerado
    const payment = await client.payInvoice(nodeId, encodedInvoice, 1000000);
    console.log(payment);
    if (!payment) {
      throw new Error("Falha ao pagar o invoice.");
    }

    console.log("Pagamento realizado:", payment);

    // Retorna o status do pagamento
    return NextResponse.json({ payment });

  } catch (error) {
    console.error("Erro ao processar o pagamento:", error);
    return NextResponse.json({ error: "Falha ao processar o pagamento." }, { status: 500 });
  }
}
