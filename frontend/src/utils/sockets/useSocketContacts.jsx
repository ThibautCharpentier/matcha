import { useEffect, useRef, useState } from 'react';
import { WS_URL } from '../constants';

export const useSocketContacts = (isAuthenticated, setContacts) => {
	const socketContactsRef = useRef(null);
	const repeat = useRef();
	const [closeState, setCloseState] = useState(false);

	useEffect(() => {
		if (isAuthenticated && socketContactsRef.current == null) {
			socketContactsRef.current = new WebSocket(WS_URL);

			socketContactsRef.current.onopen = () => {
				repeat.current = setInterval(() => {
					if (socketContactsRef.current.readyState === WebSocket.OPEN)
						socketContactsRef.current.send("CONTACT");
				}, 1000);
			}

			socketContactsRef.current.onmessage = (event) => {
				let res = JSON.parse(event.data);
				setContacts(res)
			}

			socketContactsRef.current.onclose = (event) => {
				clearInterval(repeat.current);
				socketContactsRef.current = null;
				setCloseState(!closeState);
			}

			socketContactsRef.current.onerror = () => {
				clearInterval(repeat.current);
				socketContactsRef.current = null;
			}
		}

		return () => {
            if (socketContactsRef.current && (socketContactsRef.current.readyState === WebSocket.OPEN || socketContactsRef.current.readyState === WebSocket.CLOSING))
				socketContactsRef.current.close();
        };
	}, [isAuthenticated, closeState])
}

export default useSocketContacts;
