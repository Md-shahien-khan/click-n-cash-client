// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../Providers/AuthProvider';
// import axios from 'axios';

// const useRole = () => {
//   const { user } = useContext(AuthContext);
//   const [coins, setCoins] = useState(0);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`https://click-n-cash-server.vercel.app/users/${user.role}`)  
//         .then((response) => {
//             // console.log(response)
//           setCoins(response.data?.coins); 
//         })

//     }
//   }, [user]); 

//   return { coins };
// };

// export default useRole;























// import { useContext } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { AuthContext } from '../Providers/AuthProvider'
// import useAxiosSecure from './useAxiosSecure'

// const useRole = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, loading } = useContext(AuthContext)
//   const { data: role, isLoading } = useQuery({
//     queryKey: ['role', user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const { data } = await useAxiosSecure(/users/role/${user?.email})
//       return data.role
//     },
//   })
//   console.log(role)
//   return [role, isLoading]
// }

// export default useRole;




// import { useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios'; // Import axios directly
// import { AuthContext } from '../Providers/AuthProvider';

// const useRole = () => {
//   const { user, loading } = useContext(AuthContext);

//   const { data: role, isLoading } = useQuery({
//     queryKey: ['role', user?.email],
//     enabled: !loading && !!user?.email, // Only run query if user is logged in
//     queryFn: async () => {
//       // Make an axios.get request to get the user's role
//       const { data } = await axios.get(`/users/role/${user?.email}`);
//       return data.role; // Assuming response has { role: 'admin' } or similar
//     },
//   });

//   console.log(role); // Debugging log to check the role value
//   return [role, isLoading];
// };

// export default useRole;




// import { useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios'; // Import axios for making API calls
// import { AuthContext } from '../Providers/AuthProvider'; // Your AuthContext to get user data

// const useRole = () => {
//   const { user } = useContext(AuthContext); // Getting user data from AuthContext
  
//   // Use useQuery to fetch the user's role
//   const { data: role, isLoading, error } = useQuery(
//     ['role', user?.email], // Query key is unique per email
//     async () => {
//       // Handle the case if user.email is not available
//       if (!user?.email) {
//         throw new Error('User email is required');
//       }

//       try {
//         // Fetch the role using axios
//         const response = await axios.get(`/users/role/${user?.email}`);
//         // Log the API response for debugging
//         console.log('API Response:', response);

//         // Check if the response contains role data
//         if (!response?.data?.role) {
//           throw new Error('Role data not found');
//         }
        
//         // Return the role from the API response
//         return response.data.role;
//       } catch (error) {
//         // If there's any error, throw it to handle in the query error state
//         console.error('Error fetching role:', error);
//         throw error;
//       }
//     },
//     {
//       enabled: !!user?.email, // Only run the query if the user email exists
//     }
//   );

//   // If there's an error, log it
//   if (error) {
//     console.error('Error in useRole hook:', error);
//   }

//   return [role, isLoading, error]; // Return the role, loading state, and error
// };

// export default useRole;
