import React from 'react';

interface MessageProps {
  text: string;
  timestamp?: string;
  isSentByUser?: boolean;
}

const MessageBubble: React.FC<MessageProps> = ({ text, timestamp, isSentByUser }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isSentByUser ? 'flex-end' : 'flex-start',
      padding: '8px'
    }}>
      <div style={{
        maxWidth: '60%',
        padding: '10px',
        paddingBottom: '20px',
        backgroundColor: isSentByUser ? '#fff' : '',
        color: isSentByUser ? '#000' : '#fff',
        borderRadius: '8px',
        boxShadow: isSentByUser ? '0 1px 2px rgba(0, 0, 0, 0.2)' : '',
        fontSize: '14px',
        lineHeight: '20px',
        position: 'relative'
      }}>
        <span>{text}</span>
        {timestamp && (
          <span style={{
            fontSize: '10px',
            color: '#888',
            position: 'absolute',
            bottom: '5px',
            right: '10px'
          }}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
