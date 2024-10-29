export const messages = [
    { text: 'Hi! How can I help you today?', timestamp: '', isSentByUser: false }
];

interface Message {
    text: string;
    timestamp: string;
    isSentByUser: boolean;
}

function getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function addUserMessage(text: string): void {
    const timestamp = getCurrentTime();
    const newMessage: Message = { text, timestamp, isSentByUser: true };

    messages.push(newMessage);
    addBotMessage(text);
    console.log("Added message: ", newMessage);
}

async function addBotMessage(text: string): Promise<void> {
    const timestamp = getCurrentTime();

    try {
        // Faz a chamada para a API de geração de conteúdo da IA (Gemini)
        const response = await fetch('/api/geminiPrompt', {
            method: 'POST',
            body: JSON.stringify({ prompt: text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar a resposta da IA');
        }

        const data = await response.json();
        const responseText = data.response || 'Desculpe, não há resposta disponível.';

        // Calcula o valor do invoice baseado no número de tokens usados
        const tokenCount = data.tokens.totalTokenCount || 100;
        const amountInSatoshis = tokenCount; // Exemplo: 1 token = 1 satoshi

        // Faz a requisição para a API de criação de invoice
        const invoiceResponse = await fetch('/api/createInvoice', {
            method: 'POST',
            body: JSON.stringify({ amount: amountInSatoshis, memo: 'Pagamento de chatbot' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!invoiceResponse.ok) {
            throw new Error('Erro ao gerar o invoice');
        }

        const invoiceData = await invoiceResponse.json();
        const invoice = invoiceData.invoice;

        const newMessage: Message = { text: `Pague este invoice para receber a resposta: ${invoice}`, timestamp, isSentByUser: false };
        messages.push(newMessage);

    } catch (error) {
        console.error('Erro ao adicionar mensagem do bot:', error);
        const errorMessage: Message = { text: 'Desculpe, houve um erro ao processar sua solicitação.', timestamp, isSentByUser: false };
        messages.push(errorMessage);
    }
}