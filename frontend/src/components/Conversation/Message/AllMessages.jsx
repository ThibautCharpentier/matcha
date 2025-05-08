import { useState, useEffect, useRef } from 'react';
import { useAuthentified } from '../../AuthentifiedContext';
import MessageReceived from './MessageReceived';
import MessageSend from './MessageSend';
import BackEndMessages from './BackEndMessages'
import { API_URL } from '../../../utils/constants';
import Request from '../../../utils/request';

export default function AllMessages({ roomId, roomSelected }) {
    const [conversation, setConversation] = useState([]);
    const { conversations, idUser } = useAuthentified();
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const hasScrolledToBottom = useRef(false);
    const oldRoomIdref= useRef(-1);
    const [autoScroll, setAutoScroll] = useState(true);
    const [notifNewMessage, setNotifNewMessage] = useState(false);
    let lastDate = null;

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;
        
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
        setAutoScroll(isAtBottom);
    };
    
    useEffect(() => {
        const convRoomId = conversations.find(conv => conv.chatId === roomId);
        const lastMessage = convRoomId?.messages[convRoomId?.messages.length - 1] || null;

        setConversation(convRoomId?.messages || []);
        if (oldRoomIdref.current === roomId)
            hasScrolledToBottom.current = false;
        else {
            hasScrolledToBottom.current = true;
            oldRoomIdref.current = roomId;
        }
        if (!autoScroll && lastMessage?.sender != idUser) {
            setNotifNewMessage({
                content: lastMessage.message,
                contact_picture_profile: roomSelected.contact_picture_profile
            })
        }

        Request.sendMessageView(roomId);
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
        }
        else if (autoScroll) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
            hasScrolledToBottom.current = true;
        }
    }, [conversation]);

    return (
        <>
            <div
                ref={messagesContainerRef}
                className='flex flex-col overflow-y-auto h-full px-2 relative'
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
                            {message.sender != idUser ? (
                                <MessageReceived content={message.message} timestamp={message.created} />
                            ) : (
                                <MessageSend content={message.message} timestamp={message.created} />
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <BackEndMessages
                messagesContainerRef={messagesContainerRef}
                autoScroll={autoScroll}
                notifNewMessage={notifNewMessage}
                setNotifNewMessage={setNotifNewMessage}
            />
        </>
    );
}
