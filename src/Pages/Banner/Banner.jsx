import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/images/banner images/bannerImg3.jpg'
import img2 from '../../assets/images/banner images/bannerImg1.jpg'
import img3 from '../../assets/images/banner images/bannerImg2.jpg'

const Banner = () => {
    return (
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={false}>
            {/* Carousel Item 1 */}
            <div className="relative">
                <img src={img1} alt="Banner 1" />
                {/* Semi-transparent background for better text visibility */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h2 className="text-xl md:text-4xl lg:text-8xl font-bold mb-4">Welcome to Click & Cash!</h2>
                    <p className="text-sm md:text-lg mb-6">Start earning money by completing simple tasks like clicking ads and surveys.</p>
                    <a href="/join" className="btn text-teal-100 font-bold bg-teal-500 hover:bg-teal-700  py-2 px-6 rounded-md">Start Earning Now</a>
                </div>
            </div>
            
            {/* Carousel Item 2 */}
            <div className="relative">
                <img src={img2} alt="Banner 2" />
                {/* Semi-transparent background for better text visibility */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h2 className="text-xl md:text-4xl lg:text-8xl font-bold mb-4">Welcome to Click & Cash!</h2>
                    <p className="text-sm md:text-lg mb-6">Start earning money by completing simple tasks like clicking ads and surveys.</p>
                    <a href="/join" className="btn text-teal-100 font-bold bg-teal-500 hover:bg-teal-700  py-2 px-6 rounded-md">Start Earning Now</a>
                </div>
            </div>
            
            {/* Carousel Item 3 */}
            <div className="relative">
                <img src={img3} alt="Banner 3" />
                {/* Semi-transparent background for better text visibility */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h2 className="text-xl md:text-4xl lg:text-8xl font-bold mb-4">Welcome to Click & Cash!</h2>
                    <p className="text-sm md:text-lg mb-6">Start earning money by completing simple tasks like clicking ads and surveys.</p>
                    <a href="/join" className="btn text-teal-100 font-bold bg-teal-500 hover:bg-teal-700  py-2 px-6 rounded-md">Start Earning Now</a>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
