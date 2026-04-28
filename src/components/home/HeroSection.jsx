import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, GraduationCap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#f3f9ff]">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Animated Circuit Lines */}
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
                <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-brand-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[40%] w-[40rem] h-[40rem] bg-brand-secondary/10 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto h-full px-6 lg:px-16 flex items-center relative z-10">
                <div className="w-full lg:w-[58%] flex flex-col items-start gap-6 lg:gap-10">

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
                        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-brand-dark leading-[0.95] tracking-tighter">
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
                        className="text-gray-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium"
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
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-12 py-6 rounded-full font-black text-xl transition-all shadow-2xl shadow-brand-primary/30 flex items-center gap-3 group active:scale-95"
                        >
                            Read More
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>

                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center text-brand-primary shadow-xl group-hover:scale-110 transition-transform relative">
                                <Phone className="w-8 h-8" />
                                <div className="absolute inset-0 rounded-full animate-ping bg-brand-secondary/40 -z-10"></div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">Need Help?</p>
                                <p className="text-brand-dark font-black text-xl lg:text-2xl group-hover:text-brand-primary transition-colors">+91 77889 90685</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Hero Image with Masterpiece Mask */}
            <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full z-20 pointer-events-none lg:pointer-events-auto">
                <div className="relative w-full h-full">

                    {/* Custom SVG Mask Definition */}
                    <svg className="absolute w-0 h-0">
                        <defs>
                            <clipPath id="heroMasterMask" clipPathUnits="objectBoundingBox">
                                <path d="M1,0 L1,1 L0.35,1 C0.1,0.85 0.05,0.5 0.3,0.3 C0.45,0.15 0.25,0 0.3,0 L1,0 Z" />
                            </clipPath>
                        </defs>
                    </svg>

                    {/* Image Container */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full bg-brand-primary/5 overflow-hidden relative shadow-[-50px_0_100px_rgba(0,0,0,0.05)]"
                        style={{ clipPath: 'url(#heroMasterMask)' }}
                    >
                        <motion.img
                            initial={{ scale: 1.3, rotate: 2 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 3 }}
                            src={`${import.meta.env.BASE_URL}images/MOC-Building.jpg`}
                            alt="MOC Campus"
                            className="w-full h-full object-cover"
                        />
                        {/* Cinematic Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-brand-dark/5 mix-blend-overlay"></div>

                        {/* Dotted Grid Pattern */}
                        <div className="absolute bottom-[15%] left-[20%] w-48 h-48 opacity-30 pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 100 100">
                                <pattern id="gridDots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1.5" fill="var(--color-brand-secondary)" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#gridDots)" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Award Badge - Positioned on the wave edge */}
                    <div className="absolute top-[60%] left-[5%] -translate-y-1/2 -translate-x-1/2 lg:-translate-x-1/4 z-30">
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                            className="relative w-48 h-48 lg:w-64 lg:h-64 drop-shadow-[0_20px_50px_rgba(128,0,0,0.2)]"
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
                                <div className="w-38 h-38 lg:w-38 lg:h-38 rounded-full flex flex-col items-center justify-center shadow-inner border-[6px] border-white text-white">
                                    <img src={`${import.meta.env.BASE_URL}MOC-Naac-B.png`} alt="NAAC-B++" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Floating Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-12 hidden lg:flex flex-col items-center gap-4 z-30"
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


