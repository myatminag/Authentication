import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ForgetPassword from './pages/ForgetPassword';
import Error from './pages/Error';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<Home />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
                <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    )
};

export default App;