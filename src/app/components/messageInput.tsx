"use client";

import React, { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

interface MessageInputProps {
    onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSend(message); // Use the onSend prop here
            setMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <FiPaperclip style={styles.icon} />
            <input
                type="text"
                placeholder="Mensagem ChatBTC"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.input}
            />
            <IoSend
                style={styles.sendIcon}
                onClick={handleSendMessage}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#3e3e3e',
        borderRadius: '20px',
        padding: '10px',
        margin: '0 auto',
        width: 'flex',
    },
    icon: {
        fontSize: '20px',
        color: '#888',
        marginRight: '10px',
        cursor: 'pointer',
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontSize: '16px',
    },
    sendIcon: {
        fontSize: '20px',
        color: '#888',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

export default MessageInput;
