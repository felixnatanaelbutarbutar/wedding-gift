import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/GlowUp.css';

const preweddingImagesModules = import.meta.glob('../../public/images/prewedding/*', { eager: true });
const preweddingImages = Object.values(preweddingImagesModules).map((mod) => mod.default || mod);

// Handle tons of photos safely
const preweddingList = preweddingImages.length > 0
    ? preweddingImages.slice(0, 30)
    : [1, 2, 3, 4].map(i => `https://via.placeholder.com/6000x4000?text=High+Res+Photo+${i}`);

export default function GlowUp() {
    const [glitchActive, setGlitchActive] = useState(false);
    const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleButtonHover = () => {
        let newX = (Math.random() - 0.5) * 300;
        let newY = (Math.random() - 0.5) * 200;
        if (window.innerWidth < 768) {
            newX = (Math.random() - 0.5) * 150;
            newY = (Math.random() - 0.5) * 100;
        }
        setButtonPos({ x: newX, y: newY });
    };

    return (
        <motion.div
            key="prewedding"
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glowup-stage"
        >
            <audio src="/sound/GlowUp.mp3" autoPlay loop className="hidden" />

            <section
                onMouseEnter={() => setGlitchActive(true)} onTouchStart={() => setGlitchActive(true)}
                className="glowup-header"
            >
                {glitchActive && (
                    <div
                        className="absolute inset-0 z-50 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(900px 700px at 20% 10%, rgba(231,210,162,0.22), transparent 55%), radial-gradient(900px 700px at 80% 20%, rgba(246,195,207,0.22), transparent 60%)",
                            animation: 'shimmer 1.8s ease-in-out both'
                        }}
                    />
                )}
                <motion.h2
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}
                    className="wg-serif text-center text-3xl md:text-5xl lg:text-7xl italic z-10 px-6 max-w-5xl tracking-wide leading-tight"
                >
                    "Untuk setiap langkah kecil, selalu ada cinta yang besar."
                </motion.h2>
                <div className="wg-divider mt-8 max-w-3xl opacity-80" />
            </section>

            <section className="glowup-feed">
                {preweddingList.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} viewport={{ once: true, margin: "-100px" }}
                        className="glowup-photo-wrapper"
                    >
                        {/* The CSS for glowup-main-image explicitly forces high-res 6000x4000 photos to fit comfortably within the viewport without cropping */}
                        <img src={src} alt={`Photo ${i + 1}`} className="glowup-main-image filter saturate-[1.05] md:saturate-[1.1]" />
                    </motion.div>
                ))}
            </section>

            <footer className="meme-footer">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                    className="wg-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-14 md:mb-18 z-10 leading-tight tracking-tight w-full max-w-6xl"
                >
                    Dengan penuh cinta, <br className="hidden sm:block" />
                    <span className="wg-gold-text break-words block mt-3 text-4xl sm:text-6xl lg:text-7xl">Selamat Menempuh</span>
                    <span className="wg-gold-text break-words block text-4xl sm:text-6xl lg:text-7xl">Hidup Baru</span>
                    <span className="text-sm sm:text-lg md:text-2xl font-normal wg-muted tracking-wide block mt-6 sm:mt-8 px-2 rgb-split">
                        Semoga selalu diberkahi, dilapangkan rezekinya, dan dilindungi cintanya.
                    </span>
                </motion.h3>

                {/* Catch Me Button */}
                <motion.div animate={{ x: buttonPos.x, y: buttonPos.y }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className="relative z-20">
                    <button
                        onMouseOver={handleButtonHover}
                        onClick={handleButtonHover}
                        onDoubleClick={() => alert("Terima kasih! Doa terbaik untuk kalian berdua.")}
                        className="wg-button py-4 px-10 md:py-5 md:px-14 font-semibold text-lg sm:text-xl md:text-2xl whitespace-nowrap"
                    >
                        Kirim Kado
                    </button>
                </motion.div>

                <div className="absolute bottom-4 sm:bottom-10 text-xs md:text-sm font-semibold tracking-[0.25em] px-4 text-center w-full uppercase wg-muted">
                    Made with love
                </div>
            </footer>
        </motion.div>
    );
}
