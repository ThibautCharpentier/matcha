import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_URL} from "../../utils/constants";

import avatar from '../../assets/images/img_avatar.png';

export default function MatchSlider({matchState, matchIndexState}) {
    const pictures = matchState[matchIndexState]?.pictures || [];
	return (
		<div className="slider-container w-full h-auto rounded-3xl">
			<Carousel className="rounded-3xl"
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
								className="rounded-3xl"
								src={`${API_URL}/${picture}`}
								alt={`Slide ${index + 1}`}
								style={{ userSelect: 'none' }}
							/>
						</div>
                	))
				:
				<div>
					<img className="rounded-3xl" src={avatar} style={{userSelect: 'none'}} alt="Slide 1"/>
				</div>
				}
			</Carousel>
			<div className="absolute flex bottom-0 h-20 w-full bg-gray-800 bg-opacity-50 rounded-b-3xl text-white flex-col items-start justify-center px-6">
				<div className="font-bold text-lg sm:text-xl">{matchState[matchIndexState].firstname} {matchState[matchIndexState].lastname}, {matchState[matchIndexState].age} ans</div>
				<div className="text-base sm:text-lg">{matchState[matchIndexState].city}, {matchState[matchIndexState].distance} km</div>
			</div>
		</div>
	)
}
