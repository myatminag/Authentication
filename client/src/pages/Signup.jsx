import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginCircleFill } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { AuthContext } from '../context/auth-context';

const Signup = () => {

    const navigate = useNavigate();

    const { state, authDispatch } = useContext(AuthContext);

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const signupHandler = async (e) => {
        e.preventDefault();

        if (username === "") {
            toast.warning("Name is required!");
        } else if (email === "") {
            toast.error("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("Includes @ in your email!");
        } else if (password === "") {
            toast.error("Password is required!");
        } else if (password.length < 6) {
            toast.error("Password must be 6 chars!");
        } else if (cpassword === "") {
            toast.error("Confirm password is required!");
        } else if (cpassword.length < 6) {
            toast.error("Confirm password must be 6 chars!");
        } else if (password !== cpassword) {
            toast.error("Password confirmation does not match!");
        } else {
            try {
                const res = await axios.post(
                    "http://localhost:4000/auth/signup", {
                        username, email, password, cpassword
                    }
                );

                if (res.status === 201) {
                    authDispatch({
                        type: "REQUEST_AUTH",
                        payload: res.data.user
                    })
                    localStorage.setItem("authToken", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    navigate('/home');
                }
            } catch (error) {
                navigate('*');
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
                            Sign Up
                        </p>
                    </div>
                    <form onSubmit={signupHandler}>
                        <div className="mb-5">
                            <label className="block mb-2 text-lg font-semibold">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Enter your name"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-[100%] px-4 py-2 rounded-md bg-[#f7f5f7] shadow-CustomShadow focus:outline-none"
                            />
                        </div>
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
                        <div className="mb-5">
                            <label className="block mb-2 text-lg font-semibold">
                                Confirm Password
                            </label>
                            <div className="w-[100%] px-4 py-2 rounded-md bg-[#f7f5f7] shadow-CustomShadow flex items-center justify-between">
                                <input
                                    required
                                    type={!showCPassword ? "password" : "text"}
                                    placeholder="Enter your confirm password"
                                    value={cpassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                    className="w-[100%] bg-transparent focus:outline-none"
                                />
                                <div className="cursor-pointer" onClick={() => setShowCPassword(!showCPassword)}>
                                    {
                                        !showCPassword ? (
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
                            Sign up
                        </button>
                        <p className="text-center">
                            Already have an account? {" "}
                            <Link to="/">
                                <span className="text-[#4895ef] underline font-semibold">
                                    Sign in here
                                </span>
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
};

export default Signup;