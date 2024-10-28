"use client"; // Add this line at the top of the file

import { useState, useEffect } from 'react';
import MessageInput from "@/app/components/messageInput";
import Sidebar from "./components/sideBar";
import MessageBubble from "./components/messageBubble";
import { messages as initialMessages, addUserMessage} from "./chatControl";

export default function Home() {
    // State to manage the messages
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

    return (
        <div className="container flex h-screen">
            {/* Sidebar */}
            <aside className="sidebar">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="main-content flex flex-col flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Welcome to the Chat Application</h1>

                {/* Scrollable Chat Messages */}
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

                {/* Message Input */}
                <footer className="footer p-4 border-t">
                    <MessageInput onSend={handleSendMessage} />
                </footer>
            </main>
        </div>
    );
}
