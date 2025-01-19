import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider'; // Assuming AuthContext is setup to handle auth
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic'; // Import the useAxiosPublic hook
import imgLogin from '../../assets/images/homeimg/login.jpg'; // Assuming this is the image
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegistrationForm = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext); // Get createUser from context
  const axiosPublic = useAxiosPublic(); // Initialize axiosPublic
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      const { name, email, password, photoURL, role } = data;

      // Call createUser function from AuthContext (Firebase authentication)
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Update the user's profile with name and photoURL
      await updateUserProfile(name, photoURL);

      // Define the default coin value based on the role
      const coins = role === 'worker' ? 10 : 50; // 10 coins for Worker, 50 coins for Buyer

      // Create user data object
      const userInfo = {
        name,
        email,
        photoURL,
        role,
        coins
      };

      console.log(userInfo)
      // Send user data to backend (MongoDB) via axios
      await axiosPublic.post('/users', userInfo)
        .then((response) => {
          if (response.data.insertedId) {
            Swal.fire('Success', 'User registered successfully!', 'success');
            // reset(); // Reset the form fields
            navigate('/'); // Navigate to the home page after successful registration
          }
        })
        .catch((error) => {
          console.error('Error adding user to the database:', error);
          Swal.fire('Error', 'There was an error saving your data. Please try again.', 'error');
        });
    } catch (error) {
      // Handle Firebase auth errors
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div>
      <Helmet>
        <title>Click & Cash | Registration</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        {/* img */}
        <div className='hidden lg:block'>
          <img className='w-[1095px] h-full' src={imgLogin} alt="" />
        </div>
        <div className="p-8 shadow-lg w-full max-w-sm bg-teal-100 border border-teal-500 h-[730px]">
          <h2 className="text-2xl font-bold text-teal-800 mb-3">Register</h2>
          <p className='mb-3'>Please fill all the required form to create an account in Click & Cash</p>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: 'Name is required' })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              />
              {errors.name && <span className="text-red-600">{errors.name.message}</span>}
            </div>

            {/* Profile Picture URL */}
            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture URL</label>
              <input
                type="url"
                placeholder="Enter your profile picture URL"
                {...register("photoURL", { required: 'Profile Picture URL is required' })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              />
              {errors.photoURL && <span className="text-red-600">{errors.photoURL.message}</span>}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                {...register("role", { required: 'Role is required' })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              >
                <option value="worker">Worker</option>
                <option value="buyer">Buyer</option>
              </select>
              {errors.role && <span className="text-red-600">{errors.role.message}</span>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: 'Email is required',
                  // pattern: {
                  //   value: /^[^@]+@[^@]+\.[^@]+$/,
                  //   message: 'Please enter a valid email',
                  // },
                })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              />
              {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
                <label className="block text-gray-700">Password</label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should be at least 6 characters long',
                      },
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"/>
                    <div className="absolute top-14 right-3 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </div>
                          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>
            {/* Register Button */}
            <div className="mb-4 text-center">
              <input
                type="submit"
                value="Register"
                className="text-white p-3 w-full rounded-lg bg-teal-500 hover:bg-teal-700 transition"
              />
            </div>

            {/* Login Link */}
            <p className="text-center">Already have an account? <a href="/login" className="text-red-600 font-semibold">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;





















// import React, { useContext } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Link, useNavigate } from 'react-router-dom';
// import imgLogin from '../../assets/images/homeimg/login.jpg'
// import { useForm } from 'react-hook-form';
// import { AuthContext } from '../../Providers/AuthProvider';
// import Swal from 'sweetalert2';
// import useAxiosPublic from '../../hooks/useAxiosPublic';


// const RegistrationForm = () => {
//   const axiosPublic = useAxiosPublic();
//   const {register, handleSubmit, reset, formState  : { errors }} = useForm();
//   const navigate = useNavigate();
//   const {createUser, updateUserProfile} = useContext(AuthContext)

//   // submit form
//   const onSubmit = data => {
//     console.log(data);
//     createUser(data.email, data.password)
//         .then(result =>{
//             const loggedUser = result.user;
//             console.log(loggedUser);
//             updateUserProfile(data.name, data.photoURL)
//                 .then(() => {
//                     // console.log('user profile info updated');
//                     // create user entry in dataBase
//                     const userInfo = {
//                       name : data.name,
//                       email : data.email
//                     }
//                     axiosPublic.post('/users', userInfo)
//                       .then( res =>{
//                         if(res.data.insertedId){
//                           console.log('user added to database')
//                           reset();
//                     Swal.fire({
//                         title: "User registered successfully",
//                         showClass: {
//                           popup: `
//                             animate__animated
//                             animate__fadeInUp
//                             animate__faster
//                           `
//                         },
//                         hideClass: {
//                           popup: `
//                             animate__animated
//                             animate__fadeOutDown
//                             animate__faster
//                           `
//                         }
//                       });
//                       navigate('/')
//                         }
//                       })
//                 })
//                 .catch(error => console.log(error))
//         })
// };

//   // console.log(watch("example"));
//   return (
//     <div>
//       <Helmet>
//         <title>Click & Cash | Registration</title>
//       </Helmet>
//       <div className="flex justify-center items-center min-h-screen bg-teal-50">
//         {/* img */}
//         <div className='hidden lg:block'>
//           <img className='w-[1050px] h-full' src={imgLogin} alt="" />
//         </div>
//         <div className="p-8 shadow-lg w-full max-w-sm bg-teal-100 border border-teal-500  h-[700px]">
//           <h2 className="text-2xl font-bold text-teal-800 mb-3">Register</h2>
//           <p className='mb-3'>Please fill all the required form to create an account in Click & Cash</p>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Name */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               {...register("name", {required : true})}
//               type="text"
//               name="name"
//               placeholder='Enter your name'
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//             />
//             {errors.name?.type === 'required' && <span className='text-red-600'>This field is required</span>}
//           </div>
//           {/* Profile Picture URL */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Profile Picture URL</label>
//             <input
//             {...register("photoURL", {required : true})}
//               type="url"
//               name="photoURL"
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//               placeholder='photo URL'
//             />
//             {errors.imgURL?.type === 'required' && <span className='text-red-600'>This field is required</span>}
//           </div>
//           {/* role */}
//           <div className='mb-4'>
//             <select {...register("role")} >
//               <option value="">Role</option>
//               <option value="worker">Worker</option>
//               <option value="buyer">Buyer</option>
//             </select>
//           </div>
//             {/* Email */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Email</label>
//               <input
//               {...register("email", {required : true})}
//                 type="email"
//                 name='email'
//                 required
//                 placeholder='Enter your email'
//                 className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//               />
//               {errors.email?.type === 'required' && <span className='text-red-600'>This field is required</span>}
//             </div>
//             {/* Password */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//               {...register("password", {
//                 required : true, 
//                 minLength : 6, 
//                 maxLength : 10,
//                 pattern : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9}$/
//               })}
//                 type="password"
//                 name='password'
//                 placeholder='Enter your password'
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//               />
//               {errors.password?.type === 'required' && <span className='text-red-600'>This field is required</span>}
//               {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
//               {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less than 10</span>}
//               {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have one upper one lower and one number</span>}
//             </div>
          
//             {/* register Button */}
//             <div className="mb-4 text-center">
//               <input
//                 type="submit"
//                 value='Register'
//                 className="text-white p-3 w-full rounded-lg bg-teal-500 hover:bg-teal-700 transition">
//               </input>
//             </div>
//             <p>Don't have any account? <Link className='text-red-600' to='/login'>Login</Link></p>
//           </form>
//         </div>
//         </div>
//     </div>
//   );
// };

// export default RegistrationForm;
