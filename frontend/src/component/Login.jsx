import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/backend/user/login`, { email, password }, { withCredentials: true });

      if(res.data?.token){
          alert("Login successful 🎉");
          localStorage.setItem("user", JSON.stringify(res.data.user.username));
          localStorage.setItem("isLoggedIn" , 'true');
          navigate(from); 
          window.location.reload();
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

 
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${backendUrl}/backend/user/signup`, { username, email, password }, { withCredentials: true });
      alert("Signup successful 🎉");
      setIsLogin(true); 
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form 
        onSubmit={isLogin ? handleLogin : handleSignUp}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-md"
      >
        {/* Title */}
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {isLogin ? "Please sign in to continue" : "Create a new account"}
        </p>

        {/* Email */}
        <div className="flex items-center w-full mt-10 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
          />
        </div>

        {/* Username (Signup only) */}
        {!isLogin && (
          <div className="flex items-center mt-4 w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input 
              type="text" 
              placeholder="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
              required 
            />
          </div>
        )}

        {/* Password */}
        <div className="flex items-center mt-4 w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
          />
        </div>

        {/* Confirm Password (Signup only) */}
        {!isLogin && (
          <div className="flex items-center mt-4 w-full border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" 
              required 
            />
          </div>
        )}

        {/* Forgot Password (Login only) */}
        {isLogin && (
          <div className="mt-5 text-left text-indigo-500">
            <a className="text-sm" href="#">Forgot password?</a>
          </div>
        )}

        {/* Button */}
        <button 
          type="submit" 
          className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p className="text-gray-500 text-sm mt-3 mb-11">
          {isLogin ? (
            <>Don’t have an account?{" "}
              <button type="button" onClick={() => setIsLogin(false)} className="text-indigo-500">Sign up</button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button type="button" onClick={() => setIsLogin(true)} className="text-indigo-500">Login</button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
