'use client';
import '../globals.css';
import localFont from 'next/font/local';


import { useState } from "react";

const scienceGothicFont = localFont({
    src: '../../public/fonts/Science-Gothic.woff2',
    weight: '600',
    style: 'normal',
});

export default function Login() {

    const [state, setState] = useState('Login');
    return (
    <div className="min-h-screen bg-linear-to-br from-blue-300 to-purple-600 flex items-center justify-center bg-white p-4">
        <div className='text-center bg-slate-900 p-10 rounded-lg shadow-xl w-full max-w-md'>
            <h1 className={`text-4xl  ${scienceGothicFont.className} font-bold text-white`}>{state === 'Login'? 'Login':'Create Account'}</h1>
            <p className='text-md font-semibold text-gray-400'>{state === 'Login'? 'Login to your account':'Create your account'}</p>


            <form>
                <div className='mt-4 flex items-center gap-3 w-full px-5 py-1 rounded-full bg-[#333A5C]'>
                    <img src='/assests/person_icon.svg' alt="" />
                    <input 
                    type="email" 
                    placeholder='Email' className='w-full px-4 py-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent' 
                    required
                    />
                </div>
                <div className='mt-4 flex items-center gap-3 w-full px-5 py-1 rounded-full bg-[#333A5C]'>
                    <img src='/assests/lock_icon.svg' alt="" />
                    <input 
                    type="password" 
                    placeholder='Password' className='w-full px-4 py-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 '
                    required
                     />
                </div>
                <p className='text-white pt-4 hover:text-red-700 text-left'>Forgot Password</p>
                <button className='text-left flex justify-items-start'>{state}</button>
            </form>
        </div>
    </div>
    );
}