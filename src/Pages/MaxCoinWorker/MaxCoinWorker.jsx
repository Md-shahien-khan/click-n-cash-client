import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaCoins } from "react-icons/fa";

const MaxCoinWorker = () => {
    const [workers, setWorkers] = useState([]);
    
    useEffect(() => {
        fetch('https://click-n-cash-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const workerList = data.filter(user => user.role === 'worker');
                const topWorkers = workerList.sort((a, b) => b.coins - a.coins).slice(0, 6);
                setWorkers(topWorkers);
            });
    }, []);

    return (
        <div className="p-6 w-10/12 mx-auto md:my-14">
            <SectionTitle
                heading="Top Coin Getter"
                subHeading="Submit More Work To Stay On Top"
            />
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {workers.map((eachWorker, index) => (
                    <motion.div
                        key={eachWorker.id}
                        className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img className="w-32 h-36 object-cover rounded-full mx-auto" src={eachWorker.photoURL} alt="Profile Picture" />
                        <div className="p-4 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">{eachWorker.name}</h2>
                            <p className="mt-2 text-gray-600">Available Coin</p>
                            <div className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-full flex justify-center items-center gap-2 w-2/4 mx-auto">
                                <FaCoins /> {eachWorker.coins} Coins
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MaxCoinWorker;
