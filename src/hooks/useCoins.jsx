// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../Providers/AuthProvider';
// import axios from 'axios';

// const useCoins = () => {
//   const { user } = useContext(AuthContext);
//   const [coins, setCoins] = useState(0);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`https://click-n-cash-server.vercel.app/users/${user.email}`)  
//         .then((response) => {
//             // console.log(response)
//           setCoins(response.data?.coins); 
//         })

//     }
//   }, [user]); 

//   return { coins };
// };

// export default useCoins;
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';

const useCoins = () => {
    const { user } = useContext(AuthContext);
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        if (user) {
            axios.get(`https://click-n-cash-server.vercel.app/users/${user.email}`)
                .then(response => setCoins(response.data?.coins || 0))
                .catch(error => console.error('Error fetching coins:', error));
        }
    }, [user]);

    return { coins };
};

export default useCoins;


// };
