import { useState, useEffect, useRef } from 'react';
import { useAuthentified } from '../../AuthentifiedContext';
import MessageReceived from './MessageReceived';
import MessageSend from './MessageSend';

export default function AllMessages({ roomId }) {
    const [conversation, setConversation] = useState([]);
    const { conversations, idUser } = useAuthentified();
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const hasScrolledToBottom = useRef(false);
    const [autoScroll, setAutoScroll] = useState(true);
    let lastDate = null;
    
    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;
        
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
        setAutoScroll(isAtBottom);
    };
    
    useEffect(() => {
        const convRoomId = conversations.find(conv => conv.chatId === roomId);
        setConversation(convRoomId?.messages || []);
        hasScrolledToBottom.current = false;
        console.log("room")
    }, [roomId, conversations]);


    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!messagesEndRef.current) return;

        if (autoScroll && conversation.length > 0 && hasScrolledToBottom.current === false) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            console.log("smooth")
        }
        else if (autoScroll) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
            hasScrolledToBottom.current = true;
            console.log("auto")
        }
    }, [conversation]);

    return (
        <div
            ref={messagesContainerRef}
            className='flex flex-col overflow-y-auto h-full px-2'
        >
            {conversation.map((message, index) => {
                const dateObj = new Date(message.created);
                const messageDate = dateObj.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const showDate = messageDate !== lastDate;
                lastDate = messageDate;

                return (
                    <div key={index}>
                        {showDate && (
                            <p className="text-center text-gray-500 text-xs my-2">{messageDate}</p>
                        )}
                        {message.sender === idUser ? (
                            <MessageSend content={message.message} timestamp={message.created} />
                        ) : (
                            <MessageReceived content={message.message} timestamp={message.created} />
                        )}
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}
