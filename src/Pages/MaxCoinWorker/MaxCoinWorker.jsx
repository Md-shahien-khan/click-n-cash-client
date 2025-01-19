import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaCoins } from "react-icons/fa";

const MaxCoinWorker = () => {
    const [workers, setWorkers] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                // Filter workers who have the role 'worker'
                const workerList = data.filter(user => user.role === 'worker');
                // Sort the workers by coins in descending order and take the top 6
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    workers.map(eachWorker => (
                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white" key={eachWorker.id}>
                            <img className="w-32 h-36 object-cover rounded-full mx-auto" src={eachWorker.photoURL} alt="Profile Picture" />
                            <div className="p-4 text-center">
                                <h2 className="text-xl font-semibold text-gray-800">{eachWorker.name}</h2>
                                <p className="mt-2 text-gray-600">Available Coin</p>
                                <div className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-full flex justify-center items-center gap-2 w-2/4 mx-auto">
                                    <FaCoins /> {eachWorker.coins} Coins
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MaxCoinWorker;























// import { useEffect, useState } from "react";
// import SectionTitle from "../../Components/SectionTitle/SectionTitle";
// import { FaCoins } from "react-icons/fa";

// const MaxCoinWorker = () => {
//     const [worker, setWorker] = useState([]);
    
//     useEffect(() => {
//         fetch('http://localhost:5000/users')
//             .then(res => res.json())
//             .then(data => {
//                 setWorker(data);
//             });
//     }, []);

//     return (
//         <div className="p-6 w-10/12 mx-auto md:my-14">
//             <SectionTitle
//                 heading="Top Coin Getter"
//                 subHeading="Submit More Work To Stay On Top"
//             />
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//                 {
//                     worker.map(eachWorker => (
//                         <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
//                         <img class="w-32 h-36 object-cover rounded-full mx-auto" src={eachWorker.photoURL} alt="Profile Picture"></img>
//                         <div class="p-4 text-center">
//                             <h2 class="text-xl font-semibold text-gray-800">{eachWorker.name}</h2>
//                             <p class="mt-2 text-gray-600">Available Coin</p>
//                             <div class="mt-2 px-4 py-2 bg-teal-500 text-white rounded-full flex justify-center items-center gap-2 w-2/4 mx-auto">
//                             <FaCoins></FaCoins> {eachWorker.coins} Coins
//                             </div>
//                         </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     );
// };

// export default MaxCoinWorker;
