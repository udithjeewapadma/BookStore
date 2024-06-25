import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";

function Signup() {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"
  const [showLogin, setShowLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      Fullname: data.fullname,  // Corrected the field name to match the server's expectation
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log(res.data);
      if (res.data) {
        alert("Signup successful");
        navigate (from, {replace:true});
      }
      localStorage.setItem("Users", JSON.stringify(res.data.user));
    } catch (err) {
       if(err.response){
        console.log(err);
        alert("Signup error: " + err.response.data.message);
       }
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className="modal-box w-96">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <h3 className="font-bold text-lg">Signup</h3>

            <div className='mt-4 space-y-2'>
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder='Enter your full name'
                className='w-80 px-3 py-1 border rounded-md outline-none'
                {...register("fullname", { required: true })}  // Corrected the field name to match the server's expectation
              />
              {errors.fullname && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder='Enter your email'
                className='w-80 px-3 py-1 border rounded-md outline-none'
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder='Enter your password'
                className='w-80 px-3 py-1 border rounded-md outline-none'
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className='flex justify-around mt-3'>
              <button type="submit" className='bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-300'>Signup</button>
              <p>Already have an account? <button type="button" className='underline text-blue-600 cursor-pointer' onClick={handleLoginClick}>Login</button></p>
            </div>
          </form>
        </div>
      </div>

      {showLogin && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className="modal-box w-96 relative">
            <button onClick={handleCloseLogin} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg">Login</h3>

            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br />
              <input type="email" placeholder='Enter your email' className='w-80 px-3 py-1 border rounded-md outline-none' />
            </div>

            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br />
              <input type="password" placeholder='Enter your password' className='w-80 px-3 py-1 border rounded-md outline-none' />
            </div>

            <div className='flex justify-around mt-3'>
              <Link to="/" className='bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-300'onClick={handleLoginClick}>Login</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
