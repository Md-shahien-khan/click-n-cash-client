const MaxCoinWorkerCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
                src="https://via.placeholder.com/150" 
                alt="Profile Picture" 
                className="w-full h-48 object-cover rounded-t-lg" 
            />
            <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
                <p className="text-gray-500 mt-2">Available Coins: 1200</p>
            </div>
            <div className="px-6 py-4 bg-gray-100 rounded-b-lg">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default MaxCoinWorkerCard;
