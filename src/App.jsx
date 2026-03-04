import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Opening from './components/Opening.jsx';
import KalkulatorCinta from './components/KalkulatorCinta.jsx';
import MasaKelam from './components/MasaKelam.jsx';
import QnAChat from './components/QnAChat.jsx';
import GlowUp from './components/GlowUp.jsx';

export default function App() {
    const [stage, setStage] = useState('opening');
    // Flow: 'opening' -> 'kalkulator' -> 'masaKelam' -> 'qnaChat' -> 'glowUp'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [stage]);

    return (
        <div className="w-full font-sans bg-gray-900 text-white min-h-screen relative overflow-x-hidden">
            <AnimatePresence mode="wait">

                {/* PAGE 1: OPENING COMPONENT */}
                {stage === 'opening' && (
                    <Opening key="component-opening" onNext={() => setStage('kalkulator')} />
                )}

                {/* PAGE 2: KALKULATOR CINTA (FAKE LOADING) */}
                {stage === 'kalkulator' && (
                    <KalkulatorCinta key="component-kalkulator" onNext={() => setStage('masaKelam')} />
                )}

                {/* PAGE 3: MASA KELAM COMPONENT */}
                {stage === 'masaKelam' && (
                    <MasaKelam key="component-masakelam" onNext={() => setStage('qnaChat')} />
                )}

                {/* PAGE 4: QNA CHAT (FAKE WHATSAPP) */}
                {stage === 'qnaChat' && (
                    <QnAChat key="component-qnachat" onNext={() => setStage('glowUp')} />
                )}

                {/* PAGE 5: GLOW UP COMPONENT */}
                {stage === 'glowUp' && (
                    <GlowUp key="component-glowup" />
                )}

            </AnimatePresence>
        </div>
    );
}
