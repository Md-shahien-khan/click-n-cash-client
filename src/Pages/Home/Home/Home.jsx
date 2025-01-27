import { Helmet } from "react-helmet-async";
import Banner from "../../Banner/Banner";
import Testimonials from "../../Testimonials/Testimonials";
import AboutSection from "../AboutSection/AboutSection";
import MaxCoinWorker from "../../MaxCoinWorker/MaxCoinWorker";
import Qa from "../Qa/Qa";
import DownloadApp from "../../DownloadApp/DownloadApp";

// Home
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Click & Cash | Home</title>
            </Helmet>
            <Banner></Banner> 
            <AboutSection></AboutSection>   
            <MaxCoinWorker></MaxCoinWorker>
            <Testimonials></Testimonials>
            <DownloadApp></DownloadApp>
            <Qa></Qa>
        </div>
    );
};

export default Home;