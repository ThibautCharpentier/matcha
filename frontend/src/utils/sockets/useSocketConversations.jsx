import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WS_URL } from '../constants';
import { useAuthentified } from "../../components/AuthentifiedContext"

export const useSocketConversations = (isAuthenticated, setConversations, setHasNewMessage, idUser) => {
    const socketConversationsRef = useRef(null);
    const repeat = useRef();
    const [closeState, setCloseState] = useState(false);
    const location = useLocation();
    const locationRef = useRef(location.pathname);

    useEffect(() => {

    })

    useEffect(() => {
        locationRef.current = location.pathname;
    }, [location.pathname])

    useEffect(() => {
        if (!isAuthenticated || !idUser) return;
        
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
                
                if (!locationRef.current.includes('/conversation')) {
                    const allLastMessagesNotViewed = res.every(conv => {
                        if (conv?.messages?.length) {
                            const lastMessage = conv.messages[conv.messages.length - 1];
                            console.log(lastMessage)
                            console.log(idUser)
                            if (lastMessage.sender == idUser) {
                                console.log(lastMessage)
                                return false;
                            }
                            return lastMessage.view == false;
                        }
                    });
                    if (allLastMessagesNotViewed) {
                        console.log("alors")
                        setHasNewMessage(true);
                    }
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
    }, [isAuthenticated, closeState, idUser])
}

