import { div } from 'framer-motion/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import imgLogin from '../../assets/images/homeimg/login.jpg'
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePictureURL: '',
    role: 'Worker',
    coins: 0,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      role: value,
      coins: value === 'Worker' ? 10 : 50,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    return password.length >= minLength && hasNumber.test(password) && hasUpperCase.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(formData.email)) {
      emailError = 'Please enter a valid email address.';
    }

    if (!validatePassword(formData.password)) {
      passwordError = 'Password must be at least 8 characters long, contain a number, and an uppercase letter.';
    }

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
    } else {
      // Handle successful registration (e.g., send data to API or save in state)
      alert('Registration successful!');
      // Reset the form
      setFormData({
        name: '',
        email: '',
        password: '',
        profilePictureURL: '',
        role: 'Worker',
        coins: 10,
      });
      setErrors({ email: '', password: '' });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Click & Cash | Registration</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        <div className='hidden lg:block'>
          {/* img */}
          <img className='w-[1050px] h-full' src={imgLogin} alt="" />
        </div>
      <div className="bg-teal-100 border border-teal-500 p-8 shadow-lg w-full max-w-sm h-[700px]">
        <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          {/* Profile Picture URL */}
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
              type="url"
              name="profilePictureURL"
              value={formData.profilePictureURL}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            >
              <option value="Worker">Worker</option>
              <option value="Buyer">Buyer</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="text-white p-3 w-full rounded-lg bg-teal-500 hover:bg-teal-700 transition"
            >
              Register
            </button>
          </div>
          <p>Already have an account? <Link className='text-red-600' to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;
