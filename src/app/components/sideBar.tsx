"use client";

import React from 'react';
import ChatItem from './chatItem';
import Image from 'next/image';
import favicon from "@/app/favicon.ico";

const Sidebar: React.FC = () => {
    const chats = [
        { title: "Jogo do tigrinho ta pagando?", date: "Hoje" },
        { title: "Polichain é a maior da poli?", date: "Ontem", isNew: true },
        { title: "Onde fica o 'h' em Chorinhians", date: "Ontem" },
    ];

    return (
        <div style={styles.sidebarContainer}>
            <div style={styles.sidebarHeader}>
                <h2>
                    <Image 
                      src={favicon} 
                      alt='' 
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '10px'  // Define o raio das bordas arredondadas
                      }} 
                    />
                    &nbsp;&nbsp; ChatBTC 
                </h2>
                <p>Your Chats:</p>
            </div>
            <div style={styles.chatList}>
                {chats.map((chat, index) => (
                    <ChatItem key={index} title={chat.title} date={chat.date} isNew={chat.isNew} />
                ))}
            </div>
            <div style={styles.creditSection}>
                <p>Your credit is: -Insert Credit-</p>
                <span>Add some credit with Lighting</span>
            </div>
        </div>
    );
};

const styles = {
    sidebarContainer: {
        width: '250px',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '20px',
        boxSizing: 'border-box' as const,
    },
    sidebarHeader: {
        marginBottom: '20px',
    },
    chatList: {
        flex: 1,
        overflowY: 'auto' as const,
    },
    chatItemContainer: {
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px',
    },
    chatTitle: {
        fontSize: '14px',
        fontWeight: 'normal' as const,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
    },
    dateLabel: {
        fontSize: '12px',
        color: '#888',
    },
    newDot: {
        color: '#007bff',
        marginLeft: '5px',
    },
    creditSection: {
        marginTop: 'auto',
        fontSize: '12px',
        color: '#888',
        textAlign: 'center' as const,
        borderTop: '1px solid #333',
        paddingTop: '10px',
    },
};


export default Sidebar;
