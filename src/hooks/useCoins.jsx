import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';

const useCoins = () => {
  const { user } = useContext(AuthContext);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)  
        .then((response) => {
            console.log(response)
          setCoins(response.data?.coins); 
        })

    }
  }, [user]); 

  return { coins };
};

export default useCoins;