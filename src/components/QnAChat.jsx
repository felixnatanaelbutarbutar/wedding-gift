import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/QnAChat.css';

const chatData = [
    { isSender: false, text: "Tabo nai mangoli, hami kulkal" },
    { isSender: true, text: "aman mai annong akka sigaret dan lain lain" },
    { isSender: false, text: "piga annong gellleng muna bg josh" },
    { isSender: true, text: "rencana 5 bawa 3 boru" },
    { isSender: false, text: "ale jaga parhobasan anak ni akkang boru gultom olo mambungkus so sae dope pesta" },
    { isSender: true, text: "nga hu pasung i di jabu ni si toman" }
];

export default function QnAChat({ onNext }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        let currentIndex = 0;
        let activeTimeouts = [];

        // Prevent duplicate messages if React unmounts/remounts quickly
        setMessages([]);
        setShowButton(false);
        setIsTyping(false);

        const showNextMessage = () => {
            if (currentIndex >= chatData.length) {
                activeTimeouts.push(setTimeout(() => setShowButton(true), 1000));
                return;
            }

            const nextMsg = chatData[currentIndex];

            setIsTyping(true);
            const typingDelay = Math.random() * 500 + 800; // 0.8s to 1.3s

            activeTimeouts.push(setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => {
                    // Update array accurately to prevent duplicates
                    const newMessages = [...prev];
                    newMessages[currentIndex] = nextMsg;
                    return newMessages;
                });
                currentIndex++;

                activeTimeouts.push(setTimeout(showNextMessage, 500));
            }, typingDelay));
        };

        activeTimeouts.push(setTimeout(showNextMessage, 1000));

        return () => {
            activeTimeouts.forEach(clearTimeout);
        };
    }, []);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -window.innerHeight }}
            transition={{ duration: 0.6 }}
            className="chat-stage"
        >
            <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-black text-green-700 mb-6 text-center"
            >
                🗣️
            </motion.h2>

            <div className="phone-mockup">
                {/* Header */}
                <div className="chat-header">
                    <div className="text-xl">←</div>
                    <div className="chat-avatar overflow-hidden flex-shrink-0">
                        <img src="/images/logo/logogrupchat.png" alt="Group Logo" className="w-[100%] h-[100%] object-cover object-center" />
                    </div>
                    <div>
                        <div className="font-bold text-lg">ANTIBOTTAR & BROTHERNYA</div>
                        {/* <div className="text-xs text-green-200">Terakhir dilihat 5 menit lalu</div> */}
                    </div>
                </div>

                {/* Chat Body */}
                <div className="chat-body">
                    <AnimatePresence>
                        {messages.filter(msg => msg && msg.text).map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className={`bubble ${msg.isSender ? 'bubble-right' : 'bubble-left'}`}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bubble bubble-left text-gray-500 italic text-sm py-2"
                        >
                            <span className="animate-pulse">sedang mengetik...</span>
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Footer/Input fake */}
                <div className="chat-footer-mock">
                    <div className="chat-input-mock">Ketik pesan...</div>
                    <div className="bg-pink-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl">✨</div>
                </div>
            </div>

            {showButton && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 z-20"
                >
                    <button
                        onClick={onNext}
                        className="bg-pink-600 hover:bg-pink-500 text-white font-black py-4 px-8 md:px-12 rounded-full shadow-[0_10px_20px_rgba(219,39,119,0.5)] border-4 border-white text-lg md:text-2xl transition-transform hover:scale-110 active:scale-95 animate-bounce text-center drop-shadow-[0_0_15px_rgba(219,39,119,0.5)]"
                    >
                        MODE MUSIK 👉
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
