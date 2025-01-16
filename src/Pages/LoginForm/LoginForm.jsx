import React, { useContext, useEffect, useRef, useState } from 'react';
import imgLogin from '../../assets/images/homeimg/login.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      // SignIn
      signIn(email, password)
          .then(result => {
              const user = result.user;
              Swal.fire({
                  title: "Login successful",
                  showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `,
                  },
                  hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `,
                  },
              });
              navigate('/')
          });
  };

  useEffect(() => {
      loadCaptchaEnginge(6);
  }, []);

  // captcha validation
  const handleValidateCaptcha = (e) => {
      const user_captcha_value = e.target.value;
      if (validateCaptcha(user_captcha_value)) {
          setDisabled(false); // Enable the button when captcha is valid
      } else {
          setDisabled(true); // Keep the button disabled if captcha is invalid
      }
  };

  return (
      <div>
          <Helmet>
              <title>Click & Cash | Login</title>
          </Helmet>
          <div className="flex justify-center items-center min-h-screen bg-teal-50">
              <div className="p-8 shadow-lg w-full max-w-sm lg:h-[600px] bg-teal-100 border border-teal-500">
                  <h2 className="text-2xl font-bold text-teal-800 mb-3">Login</h2>
                  <p className='mb-3'>Please log in your account to access your data.</p>
                  <form onSubmit={handleLogin}>
                      {/* Email */}
                      <div className="mb-4">
                          <label className="block text-gray-700">Email</label>
                          <input
                              type="email"
                              name='email'
                              required
                              placeholder='Enter your email'
                              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                          />
                      </div>
                      {/* Password */}
                      <div className="mb-4">
                          <label className="block text-gray-700">Password</label>
                          <input
                              type="password"
                              name='password'
                              placeholder='Enter your password'
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                          />
                      </div>
                      {/* captcha */}
                      <div className="mb-4">
                          <LoadCanvasTemplate />
                          <input
                              type="text"
                              name='captcha'
                              placeholder='Type the captcha'
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                              onBlur={handleValidateCaptcha} // Added onBlur for validation
                          />
                      </div>
                      {/* Login Button */}
                      <div className="mb-4 text-center">
                          <input
                              disabled={disabled} // This is bound to the disabled state
                              type="submit"
                              value='Login'
                              className={`text-white p-3 w-full rounded-lg ${disabled ? 'bg-teal-50 text-black' : 'bg-teal-500'}`}
                          />
                      </div>
                      <p>Don't have an account? <Link className='text-red-600' to='/register'>Register</Link></p>
                  </form>
              </div>
              {/* img */}
              <div className='hidden lg:block'>
                  <img className='w-[900px] h-full' src={imgLogin} alt="" />
              </div>
          </div>
      </div>
  );
};

export default LoginForm;


