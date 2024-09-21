import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import avatar from '../../assets/images/img_avatar.png';

export default function MatchSlider() {
	return (
		<div className="slider-container w-full h-auto mt-6 rounded-3xl">
			<Carousel className="rounded-3xl"
				showThumbs={false}
				showStatus={false}
				transitionTime={100}
				showIndicators={false}
				emulateTouch={true}
			>
				<div>
					<img className="rounded-3xl" src={avatar} style={{userSelect: 'none'}}/>
				</div>
			</Carousel>
			<div className="absolute flex bottom-24 translate-x-7 text-white flex-col items-start justify-center">
				<div className="font-bold text-lg sm:text-xl">Prénom NOM, âge</div>
				<div className="text-base sm:text-lg">Ville</div>
			</div>
		</div>
	)
}
