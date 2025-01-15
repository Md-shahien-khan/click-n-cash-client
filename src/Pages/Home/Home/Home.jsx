import { Helmet } from "react-helmet-async";
import Banner from "../../Banner/Banner";
import Testimonials from "../../Testimonials/Testimonials";
import AboutSection from "../AboutSection/AboutSection";

// Home
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Click & Cash | Home</title>
            </Helmet>
            <Banner></Banner> 
            <AboutSection></AboutSection>   
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;