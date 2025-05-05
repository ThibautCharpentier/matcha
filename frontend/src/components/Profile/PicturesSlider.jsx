import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_URL} from "../../utils/constants";

import avatar from '../../assets/images/img_avatar.png';

export default function PicturesSlider({userData, userIndex}) {
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
	
	return (
		<div className="relative slider-container w-full max-w-[400px] max-h-[550px] aspect-[8/11] sm:w-[400px] sm:h-[550px] rounded-3xl">
			<Carousel className="rounded-3xl overflow-hidden"
				showThumbs={false}
				showStatus={false}
				transitionTime={100}
				showIndicators={false}
				emulateTouch={true}
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
			<div className="absolute flex bottom-0 max-h-[80px] sm:h-[80px] w-full aspect-[5] bg-gray-800 bg-opacity-50 rounded-b-3xl text-white flex-col items-start justify-center px-6">
				<div className="font-bold text-lg sm:text-xl">{data.firstname} {data.lastname}, {data.age} ans</div>
				{data.distance != null && data.distance != undefined && (
					<div className="text-base sm:text-lg">{data.city}, {data.distance} km</div>
				)}
			</div>
		</div>
	)
}
