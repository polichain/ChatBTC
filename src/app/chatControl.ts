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
        // Using fetch to call the API endpoint
        const response = await fetch('/api/geminiPrompt', {
            method: 'POST',
            body: JSON.stringify({ prompt: text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch bot response');
        }

        const data = await response.json();

        const botText = data.response || 'Sorry, no response available.';

        const newMessage: Message = { text: botText, timestamp, isSentByUser: false };
        messages.push(newMessage);

        console.log("Added bot message: ", newMessage);
        console.log("List of messages: ", messages);
    } catch (error) {
        console.error('Error while adding bot message:', error);
        const errorMessage: Message = { text: 'Sorry, there was an error processing your request.', timestamp, isSentByUser: false };
        messages.push(errorMessage);
    }
}
