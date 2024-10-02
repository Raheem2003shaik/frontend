/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='Layouthome'></div>
            <div className='absolute top-[150px] w-[100vw] flex justify-center'>
                <div className='sliding-text-container'>
                    <h1 className='text-green-300 text-[30px] sliding-text'>Now you can buy from your home</h1>
                </div>
            </div>
            <div className="flex justify-between items-center h-auto mt-[200px] p-8">
                <div className="w-1/2">
                    <img 
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfblx3t264PT6acwOEnS6ogOIlQLNKcPi8SA&s'
                        alt="Healthcare" 
                        className="object-cover h-full w-[500px] ml-[100px] rounded-lg shadow-lg" 
                    />
                </div>
                <div className="w-1/2 flex flex-col justify-center p-8">
                    <h1 className="text-4xl font-bold text-yellow-300">Welcome to Our Online Medical Store</h1>
                    <p className="mt-4 text-lg text-yellow-200">
                        Explore our wide range of medicines and healthcare products. Sign in or create an account to get started!
                    </p>
                    <button onClick={() => navigate('/login')}
                     className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
