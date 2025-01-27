import SectionTitle from "../../Components/sectiontitle/SectionTitle";
import appStoreImage from '../../../src/assets/images/logo/download.png'

const DownloadApp = () => {
    return (
        <section className="p-4">
            <SectionTitle
                subHeading={"You can download the app from app store and play store"}
                heading={"Download the app"}>
            </SectionTitle>
            <div className="ms-50 md:ms-[120px] lg:ms-[550px]">
                <img className="md:w-[500px]" src={appStoreImage} alt="" />
            </div>
        </section>
    );
};

export default DownloadApp;