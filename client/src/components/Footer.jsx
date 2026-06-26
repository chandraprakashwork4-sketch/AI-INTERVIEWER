import React from 'react'
import { BsRobot } from "react-icons/bs";

function Footer() {
  return (
    <div>
        <div className='bg-[#f3f3f3] flex justify-center px-4 py-6 pb-10 pt-10'>
            <div className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200  px-3 py-8 text-center'>
                <div className='flex items-center justify-center gap-3 mb-3'>
                    <div className='bg-black text-white p-2 rounded-lg'> <BsRobot size={16} /> </div>
                    <h2 className='font-semibold'>InterviewIQ.AI</h2>
                </div>
                <div>
                    <p className='text-gray-600 text-sm max-w-xl mx-auto'>Copyright © 2026 InterviewIQ.AI. All rights reserved.</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Footer