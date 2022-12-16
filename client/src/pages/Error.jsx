import React from 'react';

import InternalError from '../assets/error.svg';

const Error = () => {
    return (
        <section className="grid grid-cols-[100vw] grid-rows-[100vh]">
            <div className="w-[75%] m-auto lg:w-[25%] lg:justify-self-center lg:self-center">
                <p className="mb-3 text-center font-semibold text-2xl">
                    Internal Server Error
                </p>
                <img 
                    src={InternalError} 
                    alt="welcome" 
                    className="mb-8"
                />
                <p className="mb-3 font-semibold">
                    We're sorry!. The server has encountered an internal error and was unable to complete
                    your request.
                </p>
                <p className="mb-3 font-semibold">
                    Currently, we're fixing this issue.
                </p>
                <p className="font-semibold">
                    Thanks for supporting us.
                </p>
            </div>
        </section>
    )
};

export default Error;