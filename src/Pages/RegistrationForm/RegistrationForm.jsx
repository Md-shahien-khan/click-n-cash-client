import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import imgLogin from '../../assets/images/homeimg/login.jpg'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';


const RegistrationForm = () => {
  const {register, handleSubmit, reset, formState  : { errors }} = useForm();
  const navigate = useNavigate();
  const {createUser, updateUserProfile} = useContext(AuthContext)

  // submit form
  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    console.log('user profile info updated');
                    reset();
                    Swal.fire({
                        title: "User registered successfully",
                        showClass: {
                          popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                          popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                      });
                      navigate('/')
                })
                .catch(error => console.log(error))
        })
};

  // console.log(watch("example"));
  return (
    <div>
      <Helmet>
        <title>Click & Cash | Registration</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        {/* img */}
        <div className='hidden lg:block'>
          <img className='w-[1050px] h-full' src={imgLogin} alt="" />
        </div>
        <div className="p-8 shadow-lg w-full max-w-sm bg-teal-100 border border-teal-500  h-[700px]">
          <h2 className="text-2xl font-bold text-teal-800 mb-3">Register</h2>
          <p className='mb-3'>Please fill all the required form to create an account in Click & Cash</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              {...register("name", {required : true})}
              type="text"
              name="name"
              placeholder='Enter your name'
              required
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
            {errors.name?.type === 'required' && <span className='text-red-600'>This field is required</span>}
          </div>
          {/* Profile Picture URL */}
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
            {...register("photoURL", {required : true})}
              type="url"
              name="photoURL"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder='photo URL'
            />
            {errors.imgURL?.type === 'required' && <span className='text-red-600'>This field is required</span>}
          </div>
          {/* role */}
          <div className='mb-4'>
            <select {...register("role")} >
              <option value="">Role</option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
              {...register("email", {required : true})}
                type="email"
                name='email'
                required
                placeholder='Enter your email'
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              />
              {errors.email?.type === 'required' && <span className='text-red-600'>This field is required</span>}
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
              {...register("password", {
                required : true, 
                minLength : 6, 
                maxLength : 10,
                pattern : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9}$/
              })}
                type="password"
                name='password'
                placeholder='Enter your password'
                required
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              />
              {errors.password?.type === 'required' && <span className='text-red-600'>This field is required</span>}
              {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
              {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less than 10</span>}
              {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have one upper one lower and one number</span>}
            </div>
          
            {/* register Button */}
            <div className="mb-4 text-center">
              <input
                type="submit"
                value='Register'
                className="text-white p-3 w-full rounded-lg bg-teal-500 hover:bg-teal-700 transition">
              </input>
            </div>
            <p>Don't have any account? <Link className='text-red-600' to='/login'>Login</Link></p>
          </form>
        </div>
        </div>
    </div>
  );
};

export default RegistrationForm;
