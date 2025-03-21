import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_URL} from "../../utils/constants";

export default function PicturesSlider({userData, userIndex}) {
    const pictures = userData[userIndex]?.pictures || [];
    
	return (
		<div className="slider-container w-full h-auto rounded-3xl">
			<Carousel className="rounded-3xl"
				showThumbs={false}
				showStatus={false}
				transitionTime={100}
				showIndicators={false}
				emulateTouch={true}
			>
				{pictures.map((picture, index) => (
                    <div key={index}>
                        <img
                            className="rounded-3xl"
                            src={`${API_URL}/${picture}`}
                            alt={`Slide ${index + 1}`}
                            style={{ userSelect: 'none' }}
                        />
                    </div>
                ))}
			</Carousel>
			<div className="absolute flex bottom-0 h-20 w-full bg-gray-800 bg-opacity-50 rounded-b-3xl text-white flex-col items-start justify-center px-6">
				<div className="font-bold text-lg sm:text-xl">{userData[userIndex].firstname} {userData[userIndex].lastname}, {userData[userIndex].age} ans</div>
				{userData[userIndex].distance && (
					<div className="text-base sm:text-lg">{userData[userIndex].city}, {userData[userIndex].distance} km</div>
				)}
			</div>
		</div>
	)
}
