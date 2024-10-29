"use client";

import { useState, useEffect } from 'react';
import MessageInput from "@/app/components/messageInput";
import Sidebar from "./components/sideBar";
import MessageBubble from "./components/messageBubble";
import { messages as initialMessages, addUserMessage } from "./chatControl";

export default function Home() {
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessages([...initialMessages]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = (text: string) => {
        addUserMessage(text);
        setMessages([...initialMessages]);
    };

    const handlePayInvoice = async (invoiceId: string) => {
        try {
            const response = await fetch('/api/payInvoice', {
                method: 'POST',
                body: JSON.stringify({ encodedInvoice: invoiceId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao processar o pagamento.');
            }

            const data = await response.json();
            const paymentStatus = data.payment.status;

            if (paymentStatus === 'COMPLETED') {
                addUserMessage('Pagamento confirmado! Resposta liberada.');
            } else {
                addUserMessage('Falha no pagamento. Tente novamente.');
            }

        } catch (error) {
            console.error('Erro ao pagar o invoice:', error);
            addUserMessage('Erro ao processar o pagamento.');
        }
    };

    return (
        <div className="container flex h-screen">
            <aside className="sidebar">
                <Sidebar />
            </aside>

            <main className="main-content flex flex-col flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Welcome to the Chat BTC</h1>

                <div className="chat-container flex-grow overflow-auto">
                    {messages.map((msg, index) => (
                        <MessageBubble
                            key={index}
                            text={msg.text}
                            timestamp={msg.timestamp}
                            isSentByUser={msg.isSentByUser}
                        />
                    ))}
                </div>

                <footer className="footer p-4 border-t">
                    <MessageInput onSend={handleSendMessage} onPayInvoice={handlePayInvoice} />
                </footer>
            </main>
        </div>
    );
}
