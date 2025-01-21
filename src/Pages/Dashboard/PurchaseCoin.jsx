import React, { useState } from 'react';
import axios from 'axios';

const PurchaseCoin = () => {
    // State to track the user's coins
    const [userCoins, setUserCoins] = useState(0);

    // Function to handle coin purchase
    const handlePurchase = async (coins) => {
        try {
            // Assuming you have a way to get the user's email or ID to identify the user
            const userId = 'userId'; // Replace with actual user ID or email
            
            // Update the user's coins in the backend
            const response = await axios.patch(`http://localhost:5000/users/coins/${userId}`, { coins: userCoins + coins });
            
            // Update the frontend state to reflect the new coin count
            setUserCoins(userCoins + coins);

            // Optional: Handle successful response (e.g., show a success message)
            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating coins:", error);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 p-8">
            {/* Card 1 */}
            <div
                className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition-all"
                onClick={() => handlePurchase(10)} // Add 10 coins
            >
                <h3 className="text-xl font-bold">10 Coins</h3>
                <p className="text-lg">= $1</p>
            </div>

            {/* Card 2 */}
            <div
                className="bg-green-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-600 transition-all"
                onClick={() => handlePurchase(150)} // Add 150 coins
            >
                <h3 className="text-xl font-bold">150 Coins</h3>
                <p className="text-lg">= $10</p>
            </div>

            {/* Card 3 */}
            <div
                className="bg-yellow-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-yellow-600 transition-all"
                onClick={() => handlePurchase(500)} // Add 500 coins
            >
                <h3 className="text-xl font-bold">500 Coins</h3>
                <p className="text-lg">= $20</p>
            </div>

            {/* Card 4 */}
            <div
                className="bg-red-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-red-600 transition-all"
                onClick={() => handlePurchase(1000)} // Add 1000 coins
            >
                <h3 className="text-xl font-bold">1000 Coins</h3>
                <p className="text-lg">= $35</p>
            </div>
        </div>
    );
};

export default PurchaseCoin;
