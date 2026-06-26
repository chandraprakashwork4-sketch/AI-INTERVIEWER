// import React, { useState } from 'react'
// import { FaArrowLeft, FaCheck } from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'motion/react'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { useDispatch } from 'react-redux'                    
// import { setUserData } from '../redux/userSlice'  


//   function Pricing() {
//    const navigate = useNavigate()
//    const [selectedPlan, setSelectedPlan] = useState("free")
//    const [loadingPlan, setLoadingPlan] = useState(null);
//    const dispatch = useDispatch();


// const plans = [
//     {
//         id: "free",
//         name: "Free",
//         price: "₹0",
//         credits: 100,
//         description: "Perfect for beginners starting interview preparation.",
//         features: [
//             "100 AI Interview Credits",
//             "Basic Performance Report",
//             "Voice Interview Access",
//             "Limited History Tracking",
//         ],
//         default: true,
//     },
//     {
//         id: "basic",
//         name: "Starter Pack",
//         price: "₹100",
//         credits: 150,
//         description: "Great for focused practice and skill improvement.",
//         features: [
//             "150 AI Interview Credits",
//             "Detailed Feedback",
//             "Performance Analytics",
//             "Full Interview History",
//         ],
//     },
//     {
//         id: "pro",
//         name: "Pro Pack",
//         price: "₹500",
//         credits: 650,
//         description: "Best value for serious job preparation.",
//         features: [
//             "650 AI Interview Credits",
//             "Advanced AI Feedback",
//             "Skill Trend Analysis",
//             "Priority AI Processing",
//         ],
//         badge: "Best Value",
//     },
// ];


// const handlePayment = async (plan) => {
//     try {
//         setLoadingPlan(plan.id)

//         const amount =
//         plan.id === "basic" ? 100 :
//         plan.id === "pro" ? 500 : 0;

//         const result = await axios.post(serverUrl + "/api/payment/order" , {
//             planId: plan.id,
//             amount: amount,
//             credits: plan.credits,
//         },{withCredentials: true})

       

//         const options = {
//             key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//             amount: result.data.amount,
//             currency: "INR",
//             name: "InterviewIQ.AI",
//             description: `${plan.name} - ${plan.credits} Credits`,
//             order_id: result.data.id,
//                     handler: async function (response) {
                        
//      handler: async function (response) {
//         const verifypay = await axios.post(serverUrl + "/api/payment/verify", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//         }, { withCredentials: true })
//         dispatch(setUserData(verifypay.data.user))
//         setLoadingPlan(null)
//         alert("Payment Successful 🎉 Credits Added!")
//         navigate("/")
//     },
//             theme:{
//                 color: "#10b981",
//             },
//         }

//         const rzp = new window.Razorpay(options)
//         rzp.open()

//         setLoadingPlan(null);
//     } catch (error) {
//         console.log(error)
//         setLoadingPlan(null);
//     }
// }











// //   function Pricing() {
// //    const navigate = useNavigate()
// //    const [selectedPlan, setSelectedPlan] = useState("free")
// //    const [loadingPlan, setLoadingPlan] = useState(null);




//     return (
//         <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-6'>

//             <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>
//                 <button
//                     onClick={() => navigate("/")}
//                     className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'
//                 >
//                     <FaArrowLeft className='text-gray-600' />
//                 </button>

//                 <div className='text-center w-full'>
//                     <h1 className='text-4xl font-bold text-gray-800'>
//                         Choose Your Plan
//                     </h1>
//                     <p className='text-gray-500 mt-3 text-lg'>
//                         Flexible pricing to match your interview preparation goals.
//                     </p>
//                 </div>
//             </div>

//             <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
//                 {plans.map((plan) => {
//                     const isSelected = selectedPlan === plan.id

//                     return (
//                         <motion.div
//                             key={plan.id}
//                             whileHover={!plan.default && { scale: 1.05 }}
//                             onClick={()=>!plan.default && setSelectedPlan(plan.id)}
//                             className={`relative bg-white rounded-3xl shadow-lg p-8 cursor-pointer border-2 transition-all duration-300 ${
//                                 isSelected
//                                     ? 'border-blue-500 shadow-blue-200 shadow-xl'
//                                     : 'border-transparent hover:border-blue-200'
//                             }`}
//                         >
//                             {/* Badge */}
//                             {plan.badge && (
//                                 <span className='absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs font-semibold px-3 py-1 rounded-full'>
//                                     {plan.badge}
//                                 </span>
//                             )}

//                             {/* Plan Name */}
//                             <h2 className='text-xl font-bold text-gray-800 mb-1'>{plan.name}</h2>
//                             <p className='text-gray-500 text-sm mb-4'>{plan.description}</p>

//                             {/* Price */}
//                             <div className='mb-6'>
//                                 <span className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
//                                     {plan.price}
//                                 </span>
//                                 <span className='text-gray-400 text-sm ml-1'>/ one-time</span>
//                             </div>

//                             {/* Credits */}
//                             <div className='bg-blue-50 rounded-xl px-4 py-2 mb-6 text-center'>
//                                 <span className='text-blue-600 font-semibold text-sm'>{plan.credits} Credits</span>
//                             </div>

//                             {/* Features */}
//                             <ul className='space-y-3 mb-8'>
//                                 {plan.features.map((feature, i) => (
//                                     <li key={i} className='flex items-center gap-3 text-sm text-gray-600'>
//                                         <FaCheck className='text-blue-400 flex-shrink-0' />
//                                         {feature}
//                                     </li>
//                                 ))}
//                             </ul>

//                             {/* Button */}
//                             <button
//                             disabled={loadingPlan === plan.id}
//                               onClick={(e) => { e.stopPropagation();
//                                 if(!isSelected){
//                                     setSelectedPlan(plan.id)
//                                 } else {
//                                     handlePayment(plan)
//                                 }
//                                }}  className={`w-full py-3 rounded-xl font-semibold transition ${
//                                     isSelected
//                                         ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md'
//                                         : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
//                                 }`}
//                             >
//                              {loadingPlan === plan.id
//                                 ? "Processing..."
//                                 : plan.default
//                                 ? "Selected"
//                                 : isSelected
//                                 ? "Proceed to Pay"
//                                 : "Select Plan"}
//                             </button>
//                         </motion.div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Pricing






import React, { useState } from 'react'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Pricing() {
    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState("free")
    const [loadingPlan, setLoadingPlan] = useState(null)
    const dispatch = useDispatch()

    const plans = [
        {
            id: "free",
            name: "Free",
            price: "₹0",
            credits: 100,
            description: "Perfect for beginners starting interview preparation.",
            features: [
                "100 AI Interview Credits",
                "Basic Performance Report",
                "Voice Interview Access",
                "Limited History Tracking",
            ],
            default: true,
        },
        {
            id: "basic",
            name: "Starter Pack",
            price: "₹100",
            credits: 150,
            description: "Great for focused practice and skill improvement.",
            features: [
                "150 AI Interview Credits",
                "Detailed Feedback",
                "Performance Analytics",
                "Full Interview History",
            ],
        },
        {
            id: "pro",
            name: "Pro Pack",
            price: "₹500",
            credits: 650,
            description: "Best value for serious job preparation.",
            features: [
                "650 AI Interview Credits",
                "Advanced AI Feedback",
                "Skill Trend Analysis",
                "Priority AI Processing",
            ],
            badge: "Best Value",
        },
    ]

    const handlePayment = async (plan) => {
        try {
            setLoadingPlan(plan.id)

            const amount =
                plan.id === "basic" ? 100 :
                plan.id === "pro" ? 500 : 0

            const result = await axios.post(serverUrl + "/api/payment/order", {
                planId: plan.id,
                amount: amount,
                credits: plan.credits,
            }, { withCredentials: true })

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: result.data.amount,
                currency: "INR",
                name: "InterviewIQ.AI",
                description: `${plan.name} - ${plan.credits} Credits`,
                order_id: result.data.id,
                handler: async (response) => {
                    const verifypay = await axios.post(serverUrl + "/api/payment/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }, { withCredentials: true })
                    dispatch(setUserData(verifypay.data.user))
                    setLoadingPlan(null)
                    alert("Payment Successful 🎉 Credits Added!")
                    navigate("/")
                },
                theme: {
                    color: "#10b981",
                },
            }

            const rzp = new window.Razorpay(options)
            rzp.open()

        } catch (error) {
            console.log(error)
            setLoadingPlan(null)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-6'>

            <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>
                <button
                    onClick={() => navigate("/")}
                    className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'
                >
                    <FaArrowLeft className='text-gray-600' />
                </button>

                <div className='text-center w-full'>
                    <h1 className='text-4xl font-bold text-gray-800'>
                        Choose Your Plan
                    </h1>
                    <p className='text-gray-500 mt-3 text-lg'>
                        Flexible pricing to match your interview preparation goals.
                    </p>
                </div>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.id

                    return (
                        <motion.div
                            key={plan.id}
                            whileHover={!plan.default && { scale: 1.05 }}
                            onClick={() => !plan.default && setSelectedPlan(plan.id)}
                            className={`relative bg-white rounded-3xl shadow-lg p-8 cursor-pointer border-2 transition-all duration-300 ${
                                isSelected
                                    ? 'border-blue-500 shadow-blue-200 shadow-xl'
                                    : 'border-transparent hover:border-blue-200'
                            }`}
                        >
                            {plan.badge && (
                                <span className='absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                                    {plan.badge}
                                </span>
                            )}

                            <h2 className='text-xl font-bold text-gray-800 mb-1'>{plan.name}</h2>
                            <p className='text-gray-500 text-sm mb-4'>{plan.description}</p>

                            <div className='mb-6'>
                                <span className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
                                    {plan.price}
                                </span>
                                <span className='text-gray-400 text-sm ml-1'>/ one-time</span>
                            </div>

                            <div className='bg-blue-50 rounded-xl px-4 py-2 mb-6 text-center'>
                                <span className='text-blue-600 font-semibold text-sm'>{plan.credits} Credits</span>
                            </div>

                            <ul className='space-y-3 mb-8'>
                                {plan.features.map((feature, i) => (
                                    <li key={i} className='flex items-center gap-3 text-sm text-gray-600'>
                                        <FaCheck className='text-blue-400 flex-shrink-0' />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                disabled={loadingPlan === plan.id}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (!isSelected) {
                                        setSelectedPlan(plan.id)
                                    } else {
                                        handlePayment(plan)
                                    }
                                }}
                                className={`w-full py-3 rounded-xl font-semibold transition ${
                                    isSelected
                                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                                }`}
                            >
                                {loadingPlan === plan.id
                                    ? "Processing..."
                                    : plan.default
                                    ? "Selected"
                                    : isSelected
                                    ? "Proceed to Pay"
                                    : "Select Plan"}
                            </button>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default Pricing