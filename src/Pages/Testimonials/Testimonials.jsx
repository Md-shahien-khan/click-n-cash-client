import SectionTitle from "../../Components/sectiontitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() =>{
        fetch('reviews.json')
        .then(res => res.json())
        .then(data => setReviews(data))
    })
    return (
        <section className="mt-10 mb-10">
            <SectionTitle
            subHeading={"What Our Client Say"}
            heading={"Reviews"}>
            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                    key={review._id}
                    >
                        <div className="flex flex-col items-center">
                            <div className="border-2 rounded-lg">
                                <img className="w-[200px] h-[200px]" src={review.photo} alt="" />
                            </div>
                            <p className="text-2xl mt-4 ps-10 pe-10 md:ps-16 md:pe-16 lg md:p-2 font-semibold">{review.name}</p>
                            <p className="mt-2 text-teal-800">{review.quote}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};
export default Testimonials;