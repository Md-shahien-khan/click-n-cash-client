// import imgAbout from '../../../assets/images/homeimg/home.jpg'
// const AboutSection = () => {
//     return (
//         <div className="w-10/12 mx-auto flex md:flex-col lg:flex-row gap-12 justify-center items-center mt-32 mb-32">
//             <div>
//                 <img className='w-[600px]' src={imgAbout} alt="" />
//             </div>
//             {/* about info */}
//             <div className='lg:w-[700px]'>
//                 <h2 className='text-4xl text-center font-bold text-teal-400 mb-2'>Click & Cash</h2>
//                 <p>At Click & Cash, we believe in creating opportunities for everyone to earn money online. Whether you're looking to make some extra cash during your free time or exploring a sustainable way to supplement your income, you've come to the right place. We offer simple, user-friendly tasks that anyone can complete, such as clicking ads, filling out surveys, and engaging in online activities that earn you money. No experience required just sign up and start earning!</p>
//             </div>
//         </div>
//     );
// };

// export default AboutSection;



import { motion } from 'framer-motion';
import imgAbout from '../../../assets/images/homeimg/home.jpg';

const AboutSection = () => {
    return (
      <div className="w-10/12 mx-auto mt-32 mb-32">
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center">
                
                {/* Image Section */}
                <motion.div
                    className="lg:w-[600px] md:w-[500px] sm:w-[350px]"
                    whileInView={{opacity : 1, x : 0}}
                    initial={{ opacity: 0, x : -100}}
                    transition={{duration : 1}}
                >
                    <img className='w-full' src={imgAbout} alt="About Click & Cash" />
                </motion.div>

                {/* About Info Section */}
                <motion.div
                    className="lg:w-[700px] md:w-[500px] sm:w-[350px]"
                    whileInView={{opacity : 1, x : 0}}
                    initial={{opacity : 0, x : 100}}
                    transition={{ duration : 1}}
                >
                    <h2 className='text-4xl text-center font-bold text-teal-400 mb-4'>
                        Click & Cash
                    </h2>
                    <p className="text-lg">
                        At Click & Cash, we believe in creating opportunities for everyone to earn money online.
                        Whether you're looking to make some extra cash during your free time or exploring a sustainable
                        way to supplement your income, you've come to the right place. We offer simple, user-friendly
                        tasks that anyone can complete, such as clicking ads, filling out surveys, and engaging in online
                        activities that earn you money. No experience required—just sign up and start earning!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutSection;
