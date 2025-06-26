import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_URL} from "../../utils/constants";

import avatar from '../../assets/images/img_avatar.png';

export default function PicturesSlider({userData, userIndex}) {
	const [selectedIndex, setSelectedIndex] = useState(0);

	let data
	let pictures
	if (userIndex === null) {
		data = userData
		pictures = data.pictures || []
	}
	else {
		data = userData[userIndex]
		pictures = userData[userIndex]?.pictures || [];
	}

	useEffect(() => {
		setSelectedIndex(0);
	}, [userData, userIndex]);
	
	return (
		<div className="relative slider-container w-full max-w-[400px] max-h-[550px] aspect-[8/11] sm:w-[400px] sm:h-[550px] rounded-3xl">
			<Carousel className="rounded-3xl overflow-hidden"
				showThumbs={false}
				showStatus={false}
				transitionTime={100}
				showIndicators={false}
				emulateTouch={true}
				selectedItem={selectedIndex}
				onChange={setSelectedIndex}
			>
				{pictures.length > 0 ? 
					pictures.map((picture, index) => (
						<div key={index}>
							<img
								src={`${API_URL}/${picture}`}
								alt={`Slide ${index + 1}`}
								style={{ userSelect: 'none' }}
							/>
						</div>
					))
				:
				<div>
					<img src={avatar} style={{userSelect: 'none'}} alt="Slide 1"/>
				</div>
				}
			</Carousel>
			<div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 rounded-b-3xl text-white flex flex-col items-start justify-center px-6 py-3 space-y-1">
				<div className="font-bold text-lg sm:text-xl break-words whitespace-normal w-full">
					{data.firstname} {data.lastname}, {data.age} ans
				</div>
				{data.distance != null && data.distance != undefined && (
				<div className="text-base sm:text-lg break-words whitespace-normal w-full">
					{data.city}, {data.distance} km
				</div>
				)}
			</div>
		</div>
	)
}
