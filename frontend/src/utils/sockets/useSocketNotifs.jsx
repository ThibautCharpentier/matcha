import { useEffect, useRef, useState } from 'react';
import { WS_URL } from '../constants';

export const useSocketNotifs = (isAuthenticated, setNotifs, setHasNewNotif) => {
	const socketNotifsRef = useRef(null);
	const repeat = useRef();
	const [closeState, setCloseState] = useState(false);

	useEffect(() => {
		if (isAuthenticated && socketNotifsRef.current == null)
		{
			socketNotifsRef.current = new WebSocket(WS_URL);

			socketNotifsRef.current.onopen = () => {
				repeat.current = setInterval(() => {
					if (socketNotifsRef.current.readyState === WebSocket.OPEN)
						socketNotifsRef.current.send("NOTIF");
				}, 100);
			}

			socketNotifsRef.current.onmessage = (event) => {
				let res = JSON.parse(event.data);
				setNotifs(res)
				for (let i = 0; i < res.length; i++)
				{
					if (res[i].verified == false)
					{
						setHasNewNotif(true)
						break ;
					}
				}
			}

			socketNotifsRef.current.onclose = (event) => {
				clearInterval(repeat.current);
				socketNotifsRef.current = null;
				setCloseState(!closeState);
			}

			socketNotifsRef.current.onerror = () => {
				clearInterval(repeat.current);
				socketNotifsRef.current = null;
			}
		}

		return () => {
            if (socketNotifsRef.current && (socketNotifsRef.current.readyState === WebSocket.OPEN || socketNotifsRef.current.readyState === WebSocket.CLOSING))
				socketNotifsRef.current.close();
        };
	}, [isAuthenticated, closeState])
}

export default useSocketNotifs;
