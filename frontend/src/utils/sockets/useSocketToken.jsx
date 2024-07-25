import { useEffect, useRef, useState } from 'react';
import { WS_ROUTES, API_ROUTES } from '../constants';
import axios from 'axios';

export const useSocketToken = (isAuthenticated, logout) => {
	const socketTokenRef = useRef(null);
	const repeat = useRef();
	const [closeState, setCloseState] = useState(false);

	useEffect(() => {
		if (isAuthenticated && socketTokenRef.current == null)
		{
			socketTokenRef.current = new WebSocket(WS_ROUTES.TOKEN);

			socketTokenRef.current.onopen = () => {
				repeat.current = setInterval(() => {
					socketTokenRef.current.send("TOKEN");
				}, 50000);
			}

			socketTokenRef.current.onmessage = () => {
				axios.get(API_ROUTES.REFRESH, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status != 200)
						throw new Error('Une erreur est survenue');
					socketTokenRef.current.close(4002);
				})
				.catch((err) => {
					console.log(err);
					logout();
					socketTokenRef.current.close();
				});
			}

			socketTokenRef.current.onclose = (event) => {
				clearInterval(repeat.current);
				socketTokenRef.current = null;
				if (event.code === 4002)
					setCloseState(!closeState);
			}

			socketTokenRef.current.onerror = () => {
				clearInterval(repeat.current);
				socketTokenRef.current = null;
			}
		}

		return () => {
            if (socketTokenRef.current)
                socketTokenRef.current.close();
        };
	}, [isAuthenticated, closeState])
}

export default useSocketToken;
