import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from "motion/react"
import { BsRobot,BsCoin } from "react-icons/bs";
import {HiOutlineLogout} from "react-icons/hi"
import{FaUserAstronaut} from "react-icons/fa"
import { setUserData } from '../redux/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import AuthModel from './AuthModel';








function Navbar() {
    const userData = useSelector((state) => state.user.userData);
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAuth, setShowAuth] = useState(false);



    console.log(userData);


const handleLogout = async () => {
  try {
    await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
    dispatch(setUserData(null));
    setShowUserPopup(false);
    setShowCreditPopup(false);
    navigate('/');

  }catch (error) {
    console.log(error);
  }
}


  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
        <motion.div 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05,  }}
           className='w-full max-w-6xl flex items-center justify-between bg-white rounded-[20px] shadow-sm px-6 py-4 border border-gray-200'>
            <div className='flex items-center gap-3 cursor-pointer'>
                <div className='bg-black text-white p-2 rounded-lg'>
                  <BsRobot size={18} />
                </div>
               <h1 className='text-lg font-semibold hidden md:block'>InterviewerIQ.AI</h1>
            </div>

            <div className='flex items-center gap-6 relative'>
                <div className='relative'>
                    <button onClick={() => {
                      if(!userData) {
                        setShowAuth(true);
                        return;
                      }
                      
                      setShowCreditPopup(!showCreditPopup);
                    setShowUserPopup(false)

                    }} className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'>
                        <BsCoin size={20}/>
                        {userData?.credit || 0}
                     </button>

                      {showCreditPopup && (
                        <div className='absolute right-[50px] mt-3 w-64  bg-white rounded p-5 z-50 shadow-xl p-4 border border-gray-200 '>
                            <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                            <button onClick={() => navigate('/pricing')} className='w-full bg-black text-white py-2 rounded-lg text-sm '>Buy more credits</button>
                        </div>
                      )}
                </div>

                <div className='relative'>
                    <button onClick={() => {
                       if(!userData) {
                        setShowAuth(true);
                        return;
                      }
                      
                      
                      setShowUserPopup(!showUserPopup);
                    setShowCreditPopup(false);

                    }} className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold text-sm'>
                        {userData?.name ? userData.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                      
                      </button>

                      {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 bg-white rounded-xl p-4 z-50 shadow-xl p-4 border border-gray-200 '>
                            <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
                            <button onClick={() => navigate('/history')} className='w-full text-gray-600 py-2 rounded-lg  py-2 hover:text-black text-left text-sm '>Interview History</button>
                            <button onClick={handleLogout}
                             className='w-full  text-left text-sm py-2 rounded-lg text-sm flex items-center gap-2 text-red-500 hover:text-red-700'>
                              <HiOutlineLogout size={16} />
                               Logout</button>

                           </div>
                      )}
                
            

                        
                     
                </div>

            

            </div>

            
            
         </motion.div>
          {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

    </div>
  )   
}


export default Navbar