import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { serverUrl } from '../App';
import { auth, provider } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';









function Auth({ isModel = false }) {

  const dispatch = useDispatch();


const handleGoogleAuth = async () => {
  try {
    // Implement Google authentication logic here   
    const response = await signInWithPopup(auth, provider)
    let user = response.user;
    let name = user.displayName;
    let email = user.email;
    const result = await axios.post(`${serverUrl}/api/auth/google`, { name, email }, { withCredentials: true });
    console.log(result.data);
    dispatch(setUserData(result.data.user));
  
    
    } catch (error) {
        console.error(error)
          dispatch(setUserData(null));
    }
}



  return (
    <div className={`
      w-full
     ${isModel ? 'py-4' : 'min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20'  } 
     `}>
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05 }}
          className={`
            w-full
            ${isModel ? 'max-w-md p-8 rounded-3xl' : 'max-w-lg p-12 rounded-[32px]'} bg-white  shadow-2xl border border-gray-200'
            `}> 
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-black text-white p-2 rounded-lg'>
                  <BsRobot size={18} />
                </div>
                <h2 className='font-semibold text-lg' >InterviewerIQ.AI
                </h2>
            </div>
            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>Continue with 
                <span className='text-green-600 bg-green-100 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                   <IoSparkles size={18} />
                    AI Smart Interview
                </span>
            </h1>
            <p className='text-gray-600 text-center mb-8 px-2 text-sm leading-relaxed'>
                Sign in to start AI powered mock interviews, get personalized feedback, and boost your confidence for real interviews.
            </p>

            <motion.button
                whileHover={{ opacity: 0.9, scale: 1.05 }}
                whileTap={{ opacity: 1, scale: 0.95 }}
                onClick={handleGoogleAuth}
              className='w-full bg-black text-white flex items-center justify-center gap-3 py-3 rounded-full font-semibold shadow-md text-lg transition duration-300 ' >
                <FcGoogle size={20} />
                Sign in with Google
                
            </motion.button>
        </motion.div>

     
    </div>
  )
}

export default Auth