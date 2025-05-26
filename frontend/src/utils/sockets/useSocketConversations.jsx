import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WS_URL } from '../constants';

export const useSocketConversations = (isAuthenticated, setConversations, setHasNewMessage, idUser) => {
    const socketConversationsRef = useRef(null);
    const repeat = useRef();
    const [closeState, setCloseState] = useState(false);
    const location = useLocation();
    const locationRef = useRef(location.pathname);

    useEffect(() => {
        locationRef.current = location.pathname;
    }, [location.pathname])

    useEffect(() => {
        if (isAuthenticated && socketConversationsRef.current == null) {
            socketConversationsRef.current = new WebSocket(WS_URL);

            socketConversationsRef.current.onopen = () => {
                repeat.current = setInterval(() => {
                    if (socketConversationsRef.current.readyState === WebSocket.OPEN)
                        socketConversationsRef.current.send("CONVERSATIONS");
                }, 100);
            }

            socketConversationsRef.current.onmessage = (event) => {
                const res = JSON.parse(event.data);
                console.log("socket conversation")
                console.log(res);
                
                if (!locationRef.current.includes('/conversation')) {
                    const allLastMessagesNotViewed = res.every(conv => {
                        if (conv?.messages?.length) {
                            const lastMessage = conv.messages[conv.messages.length - 1];
                            if (lastMessage.sender === idUser)
                                return false;
                            return lastMessage.view === false;
                        }
                    });
                    if (allLastMessagesNotViewed && event.data != "[]")
                        setHasNewMessage(true);
                }
                setConversations(res);
            }

            socketConversationsRef.current.onclose = (event) => {
                clearInterval(repeat.current);
                socketConversationsRef.current = null;
                setCloseState(!closeState);
            }

            socketConversationsRef.current.onerror = () => {
                clearInterval(repeat.current);
                socketConversationsRef.current = null;
            }
        }

        return () => {
            if (socketConversationsRef.current && (socketConversationsRef.current.readyState === WebSocket.OPEN || socketConversationsRef.current.readyState === WebSocket.CLOSING))
                socketConversationsRef.current.close();
        };
    }, [isAuthenticated, closeState])
}

export default useSocketConversations;
