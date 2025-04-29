import { useState, useEffect } from 'react';
import { useAuthentified } from '../../AuthentifiedContext';
import MessageReceived from './MessageReceived';
import MessageSend from './MessageSend';

export default function AllMessages({ roomId }) {
    const [conversation, setConversation] = useState([]);
    const { conversations, idUserRef } = useAuthentified();
    let lastDate = null;

    console.log("cooooooooonvs");
    console.log(conversations)
    // Simulation de conversations
    const allConversations = [{
        chatId: roomId,
        user1: 1,
        user2: 2,
        messages: [
            {
                sender: 1,
                message: "Hello, comment ça va ?",
                created: "2025-04-23T10:00:00"
            },
            {
                sender: 2,
                message: "Super et toi ?",
                created: "2025-04-23T10:01:00"
            },
            {
                sender: 1,
                message: "On se voit demain ?",
                created: "2025-04-24T09:30:00"
            }
        ]
    }];

    useEffect(() => {
        const convRoomId = conversations.find(conv => conv.chatId === roomId);
        setConversation(convRoomId?.messages || []);
    }, [roomId, conversations]);


    return (
        <div className='flex flex-col'>
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
                        {message.sender === idUserRef.current ? (
                            <MessageSend content={message.message} timestamp={message.created} />
                        ) : (
                            <MessageReceived content={message.message} timestamp={message.created} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}