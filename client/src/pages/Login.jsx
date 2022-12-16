import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginCircleFill } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';

const Login = () => {

    const navigate = useNavigate();

    const { state, authDispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const signinHandler = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("Includes @ in your email!");
        } else if (password === "") {
            toast.error("Password is required!");
        } else if (password.length < 6) {
            toast.error("Password must be 6 chars!");
        } else {
            try {
                const res = await axios.post(
                    "http://localhost:4000/auth/login", {
                        email, password
                    }
                );
    
                if (res.status === 200) {
                    authDispatch({
                        type: "REQUEST_AUTH",
                        payload: res.data.user
                    });
    
                    localStorage.setItem('authToken', res.data.token);;
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    navigate('/home');
                }
            } catch (error) {
                setEmail("")
                setPassword("");
                toast.error("Please sign in again!")
            }   
        }
    };

    return (
        <>
            <ToastContainer position='bottom-center' limit={1} />
            <section className="grid grid-cols-[100vw] grid-rows-[100vh]">
                <div className="w-[75%] m-auto lg:w-[25%] lg:justify-self-center lg:self-center">
                    <div className="mb-7 flex flex-col items-center justify-center">
                        <RiLoginCircleFill size={30} className="mb-3" />
                        <p className="font-bold text-2xl">
                            Sign In
                        </p>
                    </div>
                    <form onSubmit={signinHandler}>
                        <div className="mb-5">
                            <label className="block mb-2 text-lg font-semibold">
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[100%] px-4 py-2 rounded-md bg-[#f7f5f7] shadow-CustomShadow focus:outline-none"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-lg font-semibold">
                                Password
                            </label>
                            <div className="w-[100%] px-4 py-2 rounded-md bg-[#f7f5f7] shadow-CustomShadow flex items-center justify-between">
                                <input
                                    required
                                    type={!showPassword ? "password" : "text"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-[100%] bg-transparent focus:outline-none"
                                />
                                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        !showPassword ? (
                                            <BiHide size={23} color="#c0aaaf" />
                                        ) : (
                                            <BiShow size={23} color="#c0aaaf" />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="w-[100%] mb-5 py-2 rounded-md font-semibold tracking-wide text-white bg-[#4895ef]"
                        >
                            Sign in
                        </button>
                        <Link to="/forget-password">
                            <p className="mb-5 text-center text-sm font-semibold text-[#adb5bd] underline">
                                Forgot your password? 
                            </p>
                        </Link>
                        <Link to="/signup">
                            <button className="w-[100%] py-2 rounded-md font-semibold tracking-wide shadow-CustomShadow bg-white">
                                Create new account
                            </button>
                        </Link>
                    </form>
                </div>
            </section>
        </>
    )
};

export default Login;