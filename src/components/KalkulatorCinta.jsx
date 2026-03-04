import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/Kalkulator.css';

export default function KalkulatorCinta({ onNext }) {
    const [progress, setProgress] = useState(0);
    const [calculating, setCalculating] = useState(true);
    const [logMessages, setLogMessages] = useState([]);

    const logs = [
        "Menghubungkan ke satelit NASA...",
        "Menganalisis data wajah alay...",
        "Mencocokkan zodiak dan weton...",
        "Mengukur tingkat kesabaran menghadapi pasangan...",
        "Menghitung kalkulus cinta...",
        "Validasi ke-cringe-an masa lalu...",
        "HASIL DITEMUKAN!"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);

        let currentProgress = 0;
        let logIndex = 0;

        setLogMessages([logs[0]]);

        const interval = setInterval(() => {
            currentProgress += Math.random() * 15;

            // Update logs based on progress
            const expectedLogIndex = Math.min(
                Math.floor((currentProgress / 100) * logs.length),
                logs.length - 1
            );

            if (expectedLogIndex > logIndex) {
                logIndex = expectedLogIndex;
                setLogMessages(prev => [...prev.slice(-3), logs[logIndex]]);
            }

            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => setCalculating(false), 500);
            }
            setProgress(currentProgress);
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: window.innerWidth }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -window.innerWidth }}
            transition={{ duration: 0.8 }}
            className="kalkulator-stage"
        >
            <div className="terminal-box">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center border-b-2 border-green-500 pb-4">
                    <span className="animate-pulse"></span> KALKULATOR CINTA AWAOKWOKAOKWA
                </h2>

                {calculating ? (
                    <div className="flex flex-col gap-4">
                        <div className="h-32 text-sm md:text-base opacity-80 flex flex-col justify-end overflow-hidden">
                            {logMessages.map((msg, idx) => (
                                <div key={idx} className="animate-pulse font-mono">{">"} {msg}</div>
                            ))}
                        </div>

                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="text-right text-green-400 font-bold">{Math.floor(progress)}%</div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.7 }}
                        className="flex flex-col items-center py-6"
                    >
                        <h3 className="text-xl md:text-2xl text-white mb-2 font-sans font-bold">TINGKAT KECOCOKAN:</h3>
                        <div className="text-6xl md:text-8xl font-black love-match mb-8">
                            INFINITY%
                        </div>
                        <p className="text-green-300 text-center mb-8 font-sans">
                            "Sistem error... Tingkat kecocokan terlalu tinggi hingga merusak server!"
                        </p>
                        <button
                            onClick={onNext}
                            className="bg-red-600 hover:bg-red-500 text-white font-black font-sans py-3 px-8 rounded-full shadow-[0_4px_15px_rgba(239,68,68,0.5)] border-2 border-white text-lg transition-transform hover:scale-110 active:scale-95 animate-bounce"
                        >
                            PREWEDDING 👉
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
