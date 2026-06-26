import React from 'react'
import Navbar from '../components/navbar'
import { useSelector } from 'react-redux'
import{motion} from 'motion/react';
import{
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from 'react-icons/bs';
import{HiSparkles} from 'react-icons/hi2';
import{useNavigate} from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
 import hrImg from '../assets/ai interview img video/HR.png';
import techImg from '../assets/ai interview img video/tech.png';
import confidenceImg from '../assets/ai interview img video/confi.png';
import creditImg from '../assets/ai interview img video/credit.png';
import evalImg from '../assets/ai interview img video/ai-ans.png';
import resumeImg from '../assets/ai interview img video/resume.png';
import pdfImg from '../assets/ai interview img video/pdf.png';
import analyticsImg from '../assets/ai interview img video/history.png';
import Footer from '../components/Footer';





function Home() {

  const {userData} = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();


  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'> 
       <Navbar />

       <div className='flex-1 px-6 py-10'>
            
            <div className='max-w-6xl mx-auto'>

        <div className='flex justify-center mb-2'>
          <div className='bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2'>
            <HiSparkles size={16} className='text-blue-600 ' />
            AI-powered smart interview platform.

          </div>

        </div>
        <div className='text-center mb-6'>

            <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto'>
              Practice interviews with 
              <span className='relative inline-block '>
                <span className='text-blue-600 px-5 py-1 rounded-full '>
                  AI Intelligence
                </span>
              </span>
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-lg text-gray-500 max-w-2xl mx-auto mt-6'
            >
              Role based mock interviews with smart follow-ups, adaptive difficulty and personalized feedback to help you ace your interviews.
            </motion.p>
            <div className=' flex flex-wrap justify-center gap-4 mt-10'>
              <motion.button
                onClick={() =>{ 
                  if(!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate('/interview')
                }}

               whileHover={{ opacity: 0.9, scale: 1.05 }}
               whileTap={{ opacity: 1, scale: 0.95 }}
              
              className='bg-black text-white px-10 py-3 rounded-2xl hover:opacity-90 transition shadow-md '
              >
                Get Started
              </motion.button>

              <motion.button
                onClick={() =>{ 
                  if(!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate('/history')
                }}

               whileHover={{ opacity: 0.9, scale: 1.05 }}
               whileTap={{ opacity: 1, scale: 0.95 }}
              
              className='border border-gray-300  px-10 py-3 rounded-2xl hover:bg-gray-100 transition shadow-md '
              >
                View History
              </motion.button>

            </div>

          </div>

          <div className='flex flex-col md:flex-row mt-16 gap-6 mb-10 justify-center items-center'>
            {
              [
                {
                  icon: <BsRobot size={24}  />,
                  step:'STEP 1',
                  title:'Role and Experience Selection',
                  description:'AI adjust difficulty based on selected job role and experience level, providing a personalized interview experience.'
                },
                {
                  icon: <BsMic size={24}  />,
                  step:'STEP 2',
                  title:'Smart voice-based interview',
                  description:'dyanamic follow-up questions based on your responses, simulating a real interview environment .'
                },
                {
                  icon: <BsClock size={24}  />,
                  step:'STEP 3',
                  title:'time-based simulation',
                  description:'Real interview pressure with time tracking for each question, helping you manage your time effectively during interviews.'
                }
              ].map((item, index) => (
                <motion.div 
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                whileHover={{ scale: 1.08 }}
                className={`relative bg-white  rounded-3xl shadow-md hover:shadow-2xl p-8  border-2 border-blue-200 hover:border-blue-500 w-72 shrink-0 max-w-[90%] transition-all-duration-300
                  ${index === 0 ?"rotate-[-4deg]": ""}
                  ${index === 1 ?"rotate-[3deg] md:-mt-6 shadow-xl": ""}
                  ${index === 2 ?"rotate-[-3deg]": ""}
                `} 
                >
                  <div className='absolute -top-5 left-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md '>
                   {item.icon} 
                  </div>
                  <h2 className='text-xl font-semibold mb-2'>{item.title}</h2>
                  <p className='text-gray-600 text-sm'>{item.description}</p>
                  {item.step}
                  
                  
                </motion.div>
              ))
            }
            </div>

            <div className=' mb-32'>
              <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl md:text-4xl font-semibold text-center mb-6'
              >
                Why choose <span className='text-blue-600'>InterviewerIQ.AI</span>
              </motion.h2>

              <div className='grid md:grid-cols-2 gap-10'>
               {
                [{
                  img:evalImg,
                  icon:<BsBarChart size={24} />,
                  title:'AI Evaluation and Feedback',
                  description:'Receive detailed feedback on your performance, including strengths, weaknesses, and areas for improvement.'
                },
                {
                  img:resumeImg,
                  icon:<BsFileEarmarkText size={24} />,
                  title:'Resume based Interview Preparation',
                  description:'Get personalized interview questions and tips based on your resume.'
                },
                {
                  img:pdfImg,
                  icon:<BsFileEarmarkText size={24} />,
                  title:'Downloadable PDF reports',
                  description:'detailed strength and weakness analysis and improvement insights.'
                },
                {
                  img:analyticsImg,
                  icon:<BsBarChart size={24} />,
                  title:'Interview History and Analytics',
                  description:'Track your progress over time with detailed analytics and history of your past interviews.'
                },
              ].map((item, index) => (
                <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                whileHover={{ scale: 1.05 }}
                className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'
                >
                  <div className='flex flex-col md:flex-row items-center gap-8 '>
                    <div className='w-full md:w-1/2 flex justify-center'>
                    <img src={item.img} alt={item.title} className='w-full h-auto max-h-64 object-contain' />
                    </div>

                    <div className='w-full md:w-1/2'>
                    <div className='bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4'>
                      {item.icon}
                    </div>
                    <h3 className='text-2xl font-semibold mb-2'>{item.title}</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>{item.description}</p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            </div>
             

             <div className=' mb-32'>
              <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl md:text-4xl font-semibold text-center mb-6'
              >
                Multiple Interview<span className='text-blue-600'> Modes</span>
              </motion.h2>

              <div className='grid md:grid-cols-2 gap-10'>
               {
                [{
                  img:hrImg,
                  title:'HR Interview Mode',
                  description:'behavioral and communication based evaluation.'
                },
                {
                  img:techImg,                 
                  title:'Technical Interview Mode',
                  description:'deep technical questioning based on selected roles.'
                },
                {
                  img:confidenceImg,                
                  title:'Confidence detection Mode',
                  description:'Basic tone and voice analysis insights.'
                },
                {
                  img:creditImg,                
                  title:'Credit based system',
                  description:'Unlock premium interview sessions easily with our credit-based model.'
                },
              ].map((mode, index) => (
                <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                whileHover={{ y: -5 }}
                className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'
                >
                  <div className='flex items-center justify-between gap-6 '>
                  
                    <div className='w-1/2 '>

                    <h3 className='text-xl font-semibold mb-2'>{mode.title}</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>{mode.description}</p>

                    </div>
                    <div className='w-1/2 flex justify-end'>
                      <img src={mode.img} alt={mode.title} className='w-28 h-28  object-contain' />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            </div>


       </div>

       </div>
         {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}


        
       <Footer />
        

    </div>
  )
}

export default Home