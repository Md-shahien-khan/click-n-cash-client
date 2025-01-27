import React from 'react';

const PurchaseCoin = () => {
    const packages = [
        { coins: 10, price: 1 },
        { coins: 150, price: 10 },
        { coins: 500, price: 20 },
        { coins: 1000, price: 35 },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-teal-600">Purchase Coins</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="card bg-teal-500 text-white p-6 rounded-2xl shadow-lg hover:bg-teal-600 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">{pkg.coins} Coins</h2>
                        <p className="text-xl text-center mb-4">=</p>
                        <p className="text-2xl font-semibold text-center">${pkg.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;
