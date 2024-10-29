"use client";

import React, { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

interface MessageInputProps {
    onSend: (text: string) => void;
    onPayInvoice: (invoiceId: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, onPayInvoice }) => {
    const [message, setMessage] = useState('');
    const [invoiceId, setInvoiceId] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handlePayInvoice = () => {
        if (invoiceId.trim()) {
            onPayInvoice(invoiceId);
            setInvoiceId('');
        }
    };

    return (
        <div style={styles.container}>
            <FiPaperclip style={styles.icon} />
            <input
                type="text"
                placeholder="Digite sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.input}
            />
            <IoSend
                style={styles.sendIcon}
                onClick={handleSendMessage}
            />
            <input
                type="text"
                placeholder="Digite o Invoice ID"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                style={styles.inputInvoice}
            />
            <button style={styles.payButton} onClick={handlePayInvoice}>Pagar</button>
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
    inputInvoice: {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontSize: '16px',
        marginLeft: '10px',
    },
    sendIcon: {
        fontSize: '20px',
        color: '#888',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    payButton: {
        backgroundColor: '#888',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
        marginLeft: '10px',
        cursor: 'pointer',
    },
};

export default MessageInput;
