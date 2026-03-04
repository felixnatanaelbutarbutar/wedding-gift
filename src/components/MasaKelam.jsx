import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/MasaKelam.css'; // Isolated CSS

const randomImagesModules = import.meta.glob('../../public/images/random/*', { eager: true });
const randomImages = Object.values(randomImagesModules).map((mod) => mod.default || mod);

// Load more random images and fallback randomly sizes for extra chaos
const randomList = randomImages.length > 0
    ? randomImages.slice(0, 15)
    : [1, 2, 3, 4, 5, 6, 7, 8].map(i => `https://via.placeholder.com/400x${300 + Math.floor(Math.random() * 400)}?text=Alay+${i}`);

const waveText = (text) => {
    return text.split('').map((char, index) => (
        <span key={index} className={`wave-span ${char === ' ' ? 'mr-4' : ''}`}>
            {char}
        </span>
    ));
};

export default function MasaKelam({ onNext }) {
    const [introTextShown, setIntroTextShown] = useState(false);
    const [introMainShown, setIntroMainShown] = useState(false);
    const [showAlayGrid, setShowAlayGrid] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer1 = setTimeout(() => setIntroTextShown(true), 1500);
        const timer2 = setTimeout(() => setIntroMainShown(true), 4000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    return (
        <motion.div
            key="masakelam"
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full min-h-screen relative overflow-hidden flex flex-col items-center"
        >
            <audio src="/sound/MasaKelam.mp3" autoPlay loop className="hidden" />
            <AnimatePresence mode="wait">
                {!showAlayGrid ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: "-100vh" }} transition={{ duration: 0.8 }}
                        className="masakelam-stage"
                    >
                        <motion.img
                            src="/images/weird.jpg" alt="Weird 1" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=weird.jpg' }}
                            className="intro-img-left"
                            initial={{ x: '-150vw', rotate: -90 }} animate={{ x: introMainShown ? '-150vw' : 0, rotate: -15 }} transition={{ type: 'spring', bounce: 0.6, duration: 2 }}
                        />
                        <motion.img
                            src="/images/weird2.jpeg" alt="Weird 2" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=weird2.jpeg' }}
                            className="intro-img-right"
                            initial={{ x: '150vw', rotate: 90 }} animate={{ x: introMainShown ? '150vw' : 0, rotate: 15 }} transition={{ type: 'spring', bounce: 0.6, duration: 2, delay: 0.2 }}
                        />

                        {introTextShown && !introMainShown && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute z-20 flex flex-col items-center justify-center pointer-events-none w-full px-4 h-full">
                                <div className="masakelam-text wg-serif font-semibold text-center tracking-tight rgb-split">
                                    Sebuah Perjalanan <br /> yang Indah
                                </div>
                            </motion.div>
                        )}

                        {introMainShown && (
                            <motion.button
                                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.8 }}
                                onClick={() => { setShowAlayGrid(true); window.scrollTo(0, 0); }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="absolute bottom-12 sm:bottom-20 wg-button font-semibold py-4 px-8 text-lg md:text-2xl z-30 flex items-center gap-2"
                            >
                                Lihat Galeri Kenangan <motion.span className="wg-gold-text" animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>→</motion.span>
                            </motion.button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="alay-grid"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                        className="alay-grid-stage"
                    >
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ duration: 0.8 }}
                            className="wg-serif text-center text-3xl sm:text-5xl md:text-7xl font-semibold mb-10 sm:mb-14 flex justify-center flex-wrap gap-2 px-2 z-10 relative"
                        >
                            {waveText("Galeri Kenangan")}
                        </motion.h2>

                        <div className="masonry-grid w-full max-w-7xl mx-auto z-10 relative px-2 mb-16">
                            {randomList.map((src, i) => (
                                <motion.div
                                    key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true, margin: "50px" }}
                                    className="masonry-item relative group wg-card overflow-hidden"
                                >
                                    <img src={src} alt={`Memory ${i + 1}`} className="alay-image w-full h-auto block bg-white/40 transition-transform duration-500 group-hover:scale-[1.01]" />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }}
                            className="w-full max-w-3xl mx-auto z-20 flex justify-center mt-10 mb-10 sticky bottom-8"
                        >
                            <button
                                onClick={onNext}
                                className="wg-button py-4 md:py-5 px-6 md:px-10 font-semibold text-base md:text-2xl transition-transform hover:scale-[1.03] active:scale-[0.99] text-center"
                            >
                                Lanjut ke Bagian Berikutnya
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
