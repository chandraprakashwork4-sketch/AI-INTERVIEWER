// import React from 'react'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
// import 'react-circular-progressbar/dist/styles.css'

// function Timer({ timeLeft, totalTime }) {
//     const percentage = (timeLeft / totalTime) * 100

//     return (
//         <div className='w-20 h-20'>
//             <CircularProgressbar
//                 value={percentage}
//                 text={`${timeLeft}s`}
//                 styles={buildStyles({
//                     textSize: "28px",
//                     pathColor: "#3b82f6",
//                     textColor: "#ef4444",
//                     trailColor: "#e5e7eb",
//                 })}
//             />
//         </div>
//     )
// }

// export default Timer




import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft / totalTime) * 100

    const textColor = timeLeft > (totalTime * 0.25) ? '#60a5fa' : '#ef4444'

    return (
        <div className='w-20 h-20'>
            <svg style={{ height: 0 }}>
                <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgressbar
                value={percentage}
                text={`${timeLeft}s`}
                styles={buildStyles({
                    textSize: "28px",
                    pathColor: "url(#timerGradient)",
                    textColor: textColor,
                    trailColor: "#e5e7eb",
                })}
            />
        </div>
    )
}

export default Timer