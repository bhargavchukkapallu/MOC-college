import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiAcademicCap } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [heroBackgrounds, setHeroBackgrounds] = useState([]);
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}json_data/hero_backgrounds.json`)
            .then(res => res.json())
            .then(data => setHeroBackgrounds(data))
            .catch(err => console.error("Error loading hero backgrounds:", err));
    }, []);

    useEffect(() => {
        if (heroBackgrounds.length === 0) return;
        const timer = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroBackgrounds]);
    return (
        <section className="relative h-auto lg:h-screen w-full overflow-hidden bg-brand-dark flex flex-col lg:block">
            {/* 1. Full-Width Background Image Carousel */}
            <div className="relative lg:absolute lg:inset-0 z-0 bg-brand-dark order-1 lg:order-none min-h-[300px] sm:min-h-[400px] lg:min-h-0">
                <AnimatePresence mode="wait">
                    {heroBackgrounds.length > 0 && (
                        <motion.img
                            key={currentBg}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            src={`${import.meta.env.BASE_URL}${heroBackgrounds[currentBg]}`}
                            alt="MOC Campus Background"
                            className="w-full h-auto lg:absolute lg:inset-0 lg:h-full lg:object-cover"
                        />
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-brand-dark/30 mix-blend-overlay z-10 pointer-events-none"></div>
            </div>

            {/* 2. Left Side Transparent SVG Mask Overlay - Desktop Only */}
            <div className="hidden lg:block absolute top-0 left-0 w-full lg:w-[65%] h-full z-10 pointer-events-none">
                <svg className="absolute w-0 h-0">
                    <defs>
                        <clipPath id="heroLeftMask" clipPathUnits="objectBoundingBox">
                            {/* Single Wave Mask */}
                            <path d="M0,0 L0,1 L0.75,1 C1,0.65 0.5,0.35 0.75,0 L0,0 Z" />
                        </clipPath>
                    </defs>
                </svg>

                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full bg-[#f3f9ff]/85 relative shadow-[50px_0_100px_rgba(0,0,0,0.1)] pointer-events-auto"
                    style={{ clipPath: 'url(#heroLeftMask)' }}
                >
                    {/* Decorative Background Elements moved inside the mask */}
                    <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="none">
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            d="M-50,150 C150,200 300,400 100,600 C-100,800 200,950 300,1100"
                            stroke="var(--color-brand-primary)"
                            strokeWidth="1.5"
                            strokeDasharray="6 6"
                        />
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2.5 }}
                            cx="300" cy="1100" r="5" fill="var(--color-brand-primary)"
                        />
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                            d="M-100,350 C100,380 200,550 50,750 C-100,950 150,1050 250,1200"
                            stroke="var(--color-brand-primary)"
                            strokeWidth="0.8"
                        />
                    </svg>

                    {/* Ambient Glows */}
                    <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-brand-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-brand-secondary/20 rounded-full blur-[150px]"></div>

                    {/* Dotted Grid Pattern inside left mask */}
                    <div className="absolute bottom-[10%] left-[10%] w-48 h-48 opacity-20 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                            <pattern id="gridDots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1.5" fill="var(--color-brand-primary)" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#gridDots)" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* 3. Text Content */}
            <div className="relative lg:absolute lg:inset-0 z-20 order-2 bg-[#f3f9ff] lg:bg-transparent pointer-events-none">
                <div className="container mx-auto h-full px-6 lg:px-16 flex items-center py-12 lg:py-0">
                    <div className="w-full lg:w-[55%] flex flex-col items-start gap-6 lg:gap-10 pointer-events-auto">
                        {/* Elite Tagline */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[2px] w-12 bg-brand-primary"></div>
                            <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-sm lg:text-base">
                                Traditional Wisdom • Future Ready
                            </span>
                        </motion.div>

                        {/* Epic Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-brand-dark leading-[0.95] tracking-tighter">
                                A Premier <br />
                                <span className="text-brand-primary relative">
                                    Educational
                                    <motion.svg
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        className="absolute -bottom-2 left-0 w-full h-4 text-brand-secondary/40"
                                        viewBox="0 0 300 20"
                                        fill="none"
                                    >
                                        <path d="M5 15C50 5 150 5 295 15" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                                    </motion.svg>
                                </span> <br />
                                Institution
                            </h1>
                        </motion.div>

                        {/* Premium Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-gray-600 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium"
                        >
                            Nurturing Vedic knowledge and Oriental studies since 1971. We blend timeless heritage with modern academic brilliance to shape tomorrow's scholars.
                        </motion.p>

                        {/* High-Conversion Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap items-center gap-10 mt-4 lg:mt-6"
                        >
                            <Link
                                to="/about"
                                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-10 py-5 lg:px-12 lg:py-6 rounded-full font-black text-lg lg:text-xl transition-all shadow-2xl shadow-brand-primary/30 flex items-center gap-3 group active:scale-95"
                            >
                                Read More
                                <HiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 4. Award Badge - Positioned on the wave edge of the left mask */}
            <div className="absolute top-[250px] sm:top-[350px] right-4 lg:top-auto lg:bottom-[0px] lg:left-[52%] lg:-translate-y-1/2 lg:-translate-x-1/2 z-30 opacity-90 lg:opacity-100 pointer-events-auto">
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-64 lg:h-64 drop-shadow-[0_20px_50px_rgba(128,0,0,0.2)]"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                            <defs>
                                <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                            </defs>
                            <circle cx="50" cy="50" r="46" className="fill-white" />
                            <text className="text-[6px] font-black fill-brand-primary tracking-[0.25em] uppercase">
                                <textPath xlinkHref="#circlePath">
                                    • Winner Educational Excellence Award • NAAC B++ Accredited • Since 1971 •
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[75%] h-[75%] rounded-full flex flex-col items-center justify-center shadow-inner border-[4px] lg:border-[6px] border-white text-white overflow-hidden bg-white">
                            <img src={`${import.meta.env.BASE_URL}MOC-Naac-B.png`} alt="NAAC-B++" className="w-[80%] h-[80%] object-contain" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-12 hidden lg:flex flex-col items-center gap-4 z-30 pointer-events-none"
            >
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[2px] h-16 bg-gradient-to-b from-brand-primary/0 via-brand-primary to-brand-primary/0"
                    ></motion.div>
                    <span className="text-[10px] font-black text-brand-dark/40 uppercase tracking-[0.4em] [writing-mode:vertical-lr]">Scroll</span>
                </div>
            </motion.div>

        </section>
    );
};

export default HeroSection;


