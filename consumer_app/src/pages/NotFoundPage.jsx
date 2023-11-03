import React from 'react';
import { useNavigate } from 'react-router-dom';



const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className='h-[100vh] flex items-center justify-center flex-col bg-primary text-white'>
            <div className="max-w-screen-lg my-0 mx-auto text-center">
                <img src="/404.png" alt="notfound" className="max-w-[250px] mt-0 mr-auto mb-10 ml-auto" />
                <h1 className="text-6xl font-bold mb-5"> Oops, looks like you're lost.</h1>
                <p className="max-w-4xl  mt-0 mr-auto mb-10 ml-auto">
                    Maybe this page used to exist or you just spelled something wrong. So can you double check the URL?
                </p>
                <button onClick={() => navigate(-1)} className="inline-block py-4 px-8 bg-secondary  rounded-lg font-medium">
                    Go back
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;