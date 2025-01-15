import { motion } from "framer-motion";

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center mb-10">
            <motion.h3 
            whileInView={{opacity : 1, y : 0}}
            initial={{opacity : 0, y: -100}}
            transition={{duration : 0.5}}
            className="text-4xl text-center font-bold text-teal-400 mb-4">{heading}</motion.h3>
            <motion.p
            whileInView={{opacity : 1, y : 0}}
            initial={{opacity : 0, y: 50}}
            transition={{duration : 1}}
            className="text-teal-600 text-xl font-bold">{subHeading}</motion.p>
        </div>
    );
};

export default SectionTitle;

