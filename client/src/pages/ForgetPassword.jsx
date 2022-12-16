import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginCircleFill } from 'react-icons/ri';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:4000/auth/forgotpassword", {
                    email
                }
            );

            toast.success("Email Sent.");
            setEmail("");
        } catch (error) {
            navigate("*");
        }
    }

    return (
        <>
            <ToastContainer position='bottom-center' limit={1} />
            <section className="grid grid-cols-[100vw] grid-rows-[100vh]">
                <div className="w-[75%] m-auto lg:w-[25%] lg:justify-self-center lg:self-center">
                        <div className="mb-7 flex flex-col items-center justify-center">
                            <RiLoginCircleFill size={30} className="mb-3" />
                            <p className="font-bold text-2xl">
                                Forgot Password
                            </p>
                        </div>
                        <form onSubmit={forgotPasswordHandler}>
                            <div className="mb-5">
                                <label className="block mb-2 text-lg font-semibold">
                                    Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="Enter your login email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-[100%] px-4 py-2 rounded-md bg-[#f7f5f7] shadow-CustomShadow focus:outline-none"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-[100%] mb-5 py-2 rounded-md font-semibold tracking-wide text-white bg-[#4895ef]"
                            >
                                Send
                            </button>
                            <Link to="/">
                                <p className="mb-5 text-center text-sm font-semibold text-[#adb5bd] underline">
                                    Back to Login
                                </p>
                            </Link>
                        </form>
                    </div>
            </section>
        </>
    )
};

export default ForgetPassword;