import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiLoginCircleFill } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import axios from 'axios';


const ResetPassword = () => {

    const navigate = useNavigate();
    
    const { resetToken } = useParams();

    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:4000/auth/resetpassword/${resetToken}`, {
                    password
                }
            );
            
            navigate('/');
        } catch (error) {
            navigate("*");
        }
    };

    return (
        <>
            <section className="grid grid-cols-[100vw] grid-rows-[100vh]">
            <div className="w-[75%] m-auto lg:w-[25%] lg:justify-self-center lg:self-center">
                    <div className="mb-7 flex flex-col items-center justify-center">
                        <RiLoginCircleFill size={30} className="mb-3" />
                        <p className="font-bold text-2xl">
                            Reset Password
                        </p>
                    </div>
                    <form onSubmit={resetPasswordHandler}>
                        <div className="mb-5">
                            <label className="block mb-2 text-lg font-semibold">
                                New Password
                            </label>
                            <div className="w-[100%] px-4 py-2 rounded-md bg-[#f7f5f7] shadow-CustomShadow flex items-center justify-between">
                                <input
                                    required
                                    type={!showPassword ? "password" : "text"}
                                    placeholder="Enter your new password"
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
                            Confirm
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
};

export default ResetPassword;