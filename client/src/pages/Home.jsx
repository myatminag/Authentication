import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Welcome from '../assets/welcome.svg';
import { AuthContext } from '../context/auth-context';

const Home = () => {

    const navigate = useNavigate();

    const { state, authDispatch } = useContext(AuthContext);
    const { userInfo } = state;

    const logoutHandler = () => {
        authDispatch({
            type: "LOGOUT"
        });
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return ( 
        <section className="grid grid-cols-[100vw] grid-rows-[100vh]">
            <div className="w-[75%] m-auto lg:w-[25%] lg:justify-self-center lg:self-center">
                <img 
                    src={Welcome} 
                    alt="welcome" 
                    className="mb-6"
                />
                <p className="mb-6 text-2xl text-center font-semibold">
                    {userInfo.username}
                </p>
                <button 
                    onClick={logoutHandler} 
                    className="w-[100%] py-1 rounded-md bg-[#e63946] text-white"
                >
                    Logout
                </button>
            </div>
        </section>
    )
};

export default Home;