import React, { useState } from 'react';

const Hero = () => {
    const [showSplash, setShowSplash] = useState(false); // State to manage splash screen visibility

    const handleProfileClick = () => {
        setShowSplash(true); // Show the splash screen
        setTimeout(() => {
            setShowSplash(false); // Hide the splash screen after 300 milliseconds
        }, 300);
    };

    return (
        <div>
            {showSplash && (
                <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Coming Soon</h1>
                    </div>
                </div>
            )}
            <div className='flex justify-between items-center px-2 py-2'>
                <h1 className='text-gray-800 font-extrabold text-2xl text-center'>
                    QuickDigest
                </h1>
                <button 
                    className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300'
                    onClick={handleProfileClick} // Add click handler
                >
                    Profile
                </button>
            </div>
            <h1 className='text-gray-800 font-extrabold text-5xl text-center'>
                Summarize <br /> Your Articles With <br />
                <span className='bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text'>
                    Artificial Intelligence
                </span>
            </h1>
            <h2 className='py-2 px-4 text-center mx-auto max-w-2xl text-gray-700'>
                Summarize articles effortlessly with <span className='font-bold'>QuickDigest</span>, an AI-powered tool that transforms article links into concise summaries. Utilizing OpenAI GPT  , it helps users quickly access essential information, making research and reading more efficient.
            </h2>
        </div>
    );
};

export default Hero;
