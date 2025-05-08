import { useEffect, useRef, useState } from 'react';
import { WS_URL } from '../constants';

export const useSocketConversations = (isAuthenticated, setConversations, sethasMessage) => {
    const socketConversationsRef = useRef(null);
    const repeat = useRef();
    const [closeState, setCloseState] = useState(false);

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
            
                sethasMessage(true);
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
