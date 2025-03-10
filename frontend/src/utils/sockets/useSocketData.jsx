import { useEffect, useRef, useState } from 'react';
import { WS_URL } from '../constants';

export const useSocketData = (isAuthenticated, setData) => {
	const socketDataRef = useRef(null);
	const repeat = useRef();
	const [closeState, setCloseState] = useState(false);

	useEffect(() => {
		if (isAuthenticated && socketDataRef.current == null) {
			socketDataRef.current = new WebSocket(WS_URL);

			socketDataRef.current.onopen = () => {
				repeat.current = setInterval(() => {
					if (socketDataRef.current.readyState === WebSocket.OPEN)
						socketDataRef.current.send("DATA");
				}, 100);
			}

			socketDataRef.current.onmessage = (event) => {
				let res = JSON.parse(event.data);
				setData({
					username: res.username,
					firstname: res.firstname,
					lastname: res.lastname,
					email: res.email,
					preferences: res.preferences,
					bio: res.bio,
					picture_profile: res.picture_profile,
					pictures: res.pictures,
					gps: res.gps,
					latitude: res.latitude,
					longitude: res.longitude,
					interest: res.interest
				})
			}

			socketDataRef.current.onclose = (event) => {
				clearInterval(repeat.current);
				socketDataRef.current = null;
				setCloseState(!closeState);
			}

			socketDataRef.current.onerror = () => {
				clearInterval(repeat.current);
				socketDataRef.current = null;
			}
		}

		return () => {
            if (socketDataRef.current && (socketDataRef.current.readyState === WebSocket.OPEN || socketDataRef.current.readyState === WebSocket.CLOSING))
				socketDataRef.current.close();
        };
	}, [isAuthenticated, closeState])
}

export default useSocketData;
