import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { motion } from 'motion/react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function Step3Report({ report }) {
    const navigate = useNavigate()

    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading Report...</p>
            </div>
        )
    }

    const {
        finalScore = 0,
        confidence = 0,
        communication = 0,
        correctness = 0,
        questionWiseScore = [],
    } = report;

    const questionScoreData = questionWiseScore.map((score, index) => ({
        name: `Q${index + 1}`,
        score: score.score || 0
    }))

    const skills = [
        { label: "Confidence", value: confidence },
        { label: "Communication", value: communication },
        { label: "Correctness", value: correctness },
    ];

    let performanceText = "";
    let shortTagline = "";

    if (finalScore >= 8) {
        performanceText = "Ready for job opportunities.";
        shortTagline = "Excellent clarity and structured responses.";
    } else if (finalScore >= 5) {
        performanceText = "Needs minor improvement before interviews.";
        shortTagline = "Good foundation, refine articulation.";
    } else {
        performanceText = "Significant improvement required.";
        shortTagline = "Work on clarity and confidence.";
    }


const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 15;

    // TITLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });

    currentY += 4;

    // underline
    doc.setDrawColor(59, 130, 246);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 10;

    // FINAL SCORE BOX
    doc.setFillColor(219, 234, 254);
    doc.roundedRect(margin, currentY, contentWidth, 14, 3, 3, "F");

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 9, { align: "center" });

    currentY += 20;

    // SKILLS BOX
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, "F");

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Confidence: ${confidence}`, margin + 8, currentY + 7);
    doc.text(`Communication: ${communication}`, margin + 8, currentY + 13);
    doc.text(`Correctness: ${correctness}`, margin + 8, currentY + 19);

    currentY += 28;

    // ADVICE
    let advice = "";
    if (finalScore >= 8) {
        advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
        advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
        advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(147, 197, 253);
    doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246);
    doc.text("Professional Advice", margin + 8, currentY + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 16);
    doc.text(splitAdvice, margin + 8, currentY + 14);

    currentY += 28;

    // QUESTION TABLE
    autoTable(doc, {
        startY: currentY,
        margin: { left: margin, right: margin },
        head: [["#", "Question", "Score", "Feedback"]],
        body: questionWiseScore.map((q, i) => [
            `${i + 1}`,
            q.question,
            `${q.score}/10`,
            q.feedback || "No feedback",
        ]),
        styles: {
            fontSize: 7,
            cellPadding: 3,
            valign: "top",
        },
        headStyles: {
            fillColor: [59, 130, 246],
            textColor: 255,
            halign: "center",
            fontSize: 8,
        },
        columnStyles: {
            0: { cellWidth: 8, halign: "center" },
            1: { cellWidth: 50 },
            2: { cellWidth: 15, halign: "center" },
            3: { cellWidth: "auto" },
        },
        alternateRowStyles: {
            fillColor: [239, 246, 255],
        },
    });

    doc.save("AI_Interview_Report.pdf");
};




    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-10 py-8'>

            {/* Header */}
            <div className='mb-8'>
                <div className='w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/history")}
                        className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'
                    >
                        <FaArrowLeft className='text-gray-600' />
                    </button>

                    <div className='flex-1'>
                        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
                            Interview Analytics Dashboard
                        </h1>
                        <p className='text-gray-500 mt-2'>
                            AI-powered performance insights
                        </p>
                    </div>

                    <button onClick={downloadPDF} className='w-full sm:w-auto bg-gradient-to-r from-blue-400 to-cyan-400 hover:opacity-90 text-white py-3 px-6 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base'>
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                {/* LEFT COLUMN */}
                <div className='space-y-6'>

                    {/* Overall Performance */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center'
                    >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-500 mb-4 sm:mb-6">
                            Overall Performance
                        </h3>
                        <div className='relative w-36 h-36 sm:w-44 sm:h-44 mx-auto'>
                            <CircularProgressbar
                                value={(finalScore / 10) * 100}
                                text={`${finalScore}/10`}
                                styles={buildStyles({
                                    textSize: "18px",
                                    pathColor: "#3b82f6",
                                    textColor: "#3b82f6",
                                    trailColor: "#e5e7eb",
                                })}
                            />
                        </div>
                        <p className='text-xs text-gray-400 mt-3'>Out of 10</p>
                        <p className='text-gray-700 font-semibold mt-3'>{performanceText}</p>
                        <p className='text-gray-400 text-sm mt-1'>{shortTagline}</p>
                    </motion.div>

                    {/* Skill Evaluation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8'
                    >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
                            Skill Evaluation
                        </h3>
                        <div className='space-y-5'>
                            {skills.map((s, i) => (
                                <div key={i}>
                                    <div className='flex justify-between mb-2 text-sm sm:text-base'>
                                        <span className='text-gray-600'>{s.label}</span>
                                        <span className='font-semibold text-blue-500'>{s.value}</span>
                                    </div>
                                    <div className='bg-gray-200 h-2 sm:h-3 rounded-full'>
                                        <div
                                            className='bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full'
                                            style={{ width: `${s.value * 10}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN */}
                <div className='lg:col-span-2 space-y-6'>

                    {/* Performance Trend Chart */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'
                    >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                            Performance Trend
                        </h3>
                        <div className='h-64 sm:h-72'>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={questionScoreData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 10]} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        fill="#bfdbfe"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Question Wise Score */}
                    <div className='bg-white rounded-2xl shadow-md p-6 border border-blue-100'>
                        <h2 className='text-lg font-semibold text-gray-700 mb-4'>Question Wise Score</h2>
                        <div className='space-y-4'>
                            {questionWiseScore.map((q, index) => (
                                <div key={index} className='border border-gray-100 rounded-xl p-4'>
                                    <p className='text-sm font-medium text-gray-700 mb-1'>Q{index + 1}: {q.question}</p>
                                    <p className='text-xs text-gray-500 mb-2'>
                                      "{q.feedback || "No feedback available for this question"}"
                                  </p>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex-1 bg-gray-100 rounded-full h-2'>
                                            <div
                                                className='bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full'
                                                style={{ width: `${(q.score / 10) * 100}%` }}
                                            />
                                        </div>
                                        <span className='text-sm font-bold text-blue-500'>{q.score}/10</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Step3Report








