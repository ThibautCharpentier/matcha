import { useState, useEffect } from 'react';
import { useAuthentified } from '../../AuthentifiedContext';
import MessageReceived from './MessageReceived';
import MessageSend from './MessageSend';

export default function AllMessages({ roomId }) {
    const [conversation, setConversation] = useState([]);
    const { conversations, idUserRef } = useAuthentified();
    let lastDate = null;

    // Simulation de conversations
    const allConversations = [{
        id: roomId,
        idUser1: 1,
        idUser2: 2,
        messages: [
            {
                idSender: 1,
                content: "Hello, comment ça va ?",
                timestamp: "2025-04-23T10:00:00"
            },
            {
                idSender: 2,
                content: "Super et toi ?",
                timestamp: "2025-04-23T10:01:00"
            },
            {
                idSender: 1,
                content: "On se voit demain ?",
                timestamp: "2025-04-24T09:30:00"
            }
        ]
    }];

    useEffect(() => {
        const convRoomId = allConversations.find(conv => conv.id === roomId);
        setConversation(convRoomId?.messages || []);
    }, [roomId]);


    return (
        <div className='flex flex-col'>
            {conversation.map((message, index) => {
                const dateObj = new Date(message.timestamp);
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
                        {message.idSender === idUserRef.current ? (
                            <MessageSend content={message.content} timestamp={message.timestamp} />
                        ) : (
                            <MessageReceived content={message.content} timestamp={message.timestamp} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}