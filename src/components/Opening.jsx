import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/Opening.css'; // Isolated CSS

const FloatingFlowers = () => {
    const flowers = ['🌸', '🌷', '🪷', '✨', '💗', '💍', '🕊️'];
    return (
        <div className="floating-flowers-container">
            {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl md:text-5xl"
                    initial={{ y: '-10vh', x: Math.random() * 100 + 'vw', rotate: 0, opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
                    animate={{ y: '110vh', x: Math.random() * 100 + 'vw', rotate: 360, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                >
                    {flowers[Math.floor(Math.random() * flowers.length)]}
                </motion.div>
            ))}
        </div>
    );
}

function PhotoLightbox({ open, src, alt, onClose }) {
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="wg-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="wg-lightbox-panel"
                        initial={{ opacity: 0, scale: 0.97, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="wg-lightbox-close" onClick={onClose} type="button" aria-label="Close">
                            ✕
                        </button>
                        <img className="wg-lightbox-image" src={src} alt={alt} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Opening({ onNext }) {
    const [stage, setStage] = useState('envelope');
    const [lightboxSrc, setLightboxSrc] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, [stage]);

    const openingPhotos = [
        { src: "/images/random/weird.jpg", alt: "Memory photo 1" },
        { src: "/images/random/weird2.jpeg", alt: "Memory photo 2" },
    ];

    if (stage === 'envelope') {
        return (
            <motion.div
                key="envelope"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -100 }}
                transition={{ duration: 0.5 }}
                className="envelope-stage"
            >
                <FloatingFlowers />
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
                    className="envelope-card"
                >
                    <div className="wg-opening-gallery" aria-label="Photo preview">
                        {openingPhotos.map((p) => (
                            <button
                                key={p.src}
                                type="button"
                                className="wg-opening-thumb"
                                onClick={() => setLightboxSrc(p.src)}
                                aria-label="Lihat detail foto"
                            >
                                <img src={p.src} alt={p.alt} loading="lazy" />
                            </button>
                        ))}
                    </div>
                    <motion.div
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 drop-shadow-sm"
                    >
                        💌
                    </motion.div>
                    <h1 className="wg-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 font-semibold leading-tight">
                        A Special Wedding Gift from ANTIBOTTAR
                    </h1>
                    <p className="wg-muted text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                        Surat kecil yang manis untuk mengiringi hari bahagia kalian.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }} onClick={() => setStage('letter')}
                        className="wg-button px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg md:text-xl w-full"
                    >
                        Buka Surat
                    </motion.button>
                </motion.div>
                <PhotoLightbox
                    open={Boolean(lightboxSrc)}
                    src={lightboxSrc || ""}
                    alt="Photo detail"
                    onClose={() => setLightboxSrc(null)}
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -window.innerWidth }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="letter-stage"
        >
            <FloatingFlowers />
            <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -15, y: 200 }}
                animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="letter-card"
            >
                <div className="wg-opening-gallery" aria-label="Photo preview">
                    {openingPhotos.map((p) => (
                        <button
                            key={p.src}
                            type="button"
                            className="wg-opening-thumb"
                            onClick={() => setLightboxSrc(p.src)}
                            aria-label="Lihat detail foto"
                        >
                            <img src={p.src} alt={p.alt} loading="lazy" />
                        </button>
                    ))}
                </div>
                <h2 className="wg-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 font-semibold flex justify-center items-center gap-2">
                    <span className="wg-gold-text">Happy Wedding</span>
                </h2>
                <div className="wg-muted text-sm md:text-base lg:text-lg mb-6 tracking-wide leading-relaxed text-left space-y-4">
                    <p>Selamat menempuh hidup baru. Semoga rumah tangga kalian dipenuhi cinta yang tenang, tawa yang tulus, dan rezeki yang mengalir baik.</p>
                    <p>Di bawah ini ada sedikit “perjalanan kecil” yang manis dari momen sederhana, sampai hari ini jadi kisah yang indah.</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} onClick={() => onNext()}
                    className="mt-6 wg-button px-6 py-4 font-semibold text-base md:text-xl w-full"
                >
                    Lanjutkan
                </motion.button>
            </motion.div>
            <PhotoLightbox
                open={Boolean(lightboxSrc)}
                src={lightboxSrc || ""}
                alt="Photo detail"
                onClose={() => setLightboxSrc(null)}
            />
        </motion.div>
    );
}
