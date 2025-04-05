import { motion } from "framer-motion";
import OnboardingPage from "./OnboardingPage";
export default function Hero() {
    return (
        <section
            className="relative z-10 min-h-screen flex mt-10 flex-col items-center justify-center gap-1 text-center text-black px-6 w-full">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center mt-10"
            >
                {/* Tagline Box */}
                <motion.div
                    className="px-4 py-1.5 text-zinc-600  text-xs rounded-full flex items-center space-x-2 shadow-md border-[1px] border-zinc-200 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <span>✨</span>

                    {/* Glowing Text Animation */}
                    <motion.span
                        className="relative bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-600 to-black"
                        initial={{ backgroundPosition: "200% 0" }}
                        animate={{ backgroundPosition: "-200% 0" }}
                        transition={{ duration: 2, repeat: Infinity, delay: 10 }}
                        style={{
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Morden Automatice Email Sequencer
                    </motion.span>

                    {/* Animated Arrow */}
                    <motion.span
                        className="ml-2 text-gray-600"
                        initial={{ x: 5 }}
                        animate={{ x: 0 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    >
                        ➝
                    </motion.span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    className="bg-gradient-to-br mt-4 from-black from-30% to-black/60 bg-clip-text py-4 text-5xl font-semibold leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                   Visual Email Sequences 
                    <br /> Made Simple.
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="text-lg text-gray-600 max-w-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    Save time, grow leads, and automate your outreach using a modern, intuitive UI built for teams and individuals.
                </motion.p>

                {/* Call-to-Action Button */}
                <motion.button
                    className="mt-6 px-6 py-3 bg-zinc-800 text-white relative z-10 rounded-lg text-sm font-semibold shadow-lg flex items-center space-x-1 hover:bg-zinc-900 transition"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <OnboardingPage />
                    <motion.span
                        initial={{ x: 5 }}
                        animate={{ x: 0 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    >
                        ➝
                    </motion.span>
                </motion.button>
            </motion.div>


            <motion.div
                className="w-full relative z-10 mt-20 flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.div
                    className="w-full relative mt-10 p-10 flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    <motion.div
                        className="card-wrapper w-[65vw] min-w-[60vw] max-h-[65vh] min-h-[35vh] lg:min-h-[65vh] p-1 shrink-0"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    >
                        <div className="card-content w-full overflow-hidden">
                            <img className="w-full h-full rounded-xl" src="./onBoardingImg.png" />
                        </div>
                    </motion.div>

                    {/* Gradient Overlay */}
                    <motion.div
                        className="w-full absolute h-full bg-gradient-to-b from-transparent to-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    />
                </motion.div>
            </motion.div>

            {/* Bloom Effect (Fixed Blur) */}
            <motion.div
                className="w-[82%] rounded-full min-h-[560px] p-10 absolute top-[52%] left-[50%] -translate-x-1/2 z-0 -translate-y-1/2 flex gap-2 
    bg-[radial-gradient(circle_at_center,rgba(200,230,255,0.8)_0%,rgba(200,230,255,0.4)_50%,rgba(255,255,255,0)_100%)] 
    blur-[100px] opacity-80"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                    opacity: [0, 0.8, 0.6],
                    scale: 1,
                }}
                transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: 0.2,
                    opacity: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }
                }}
            >
            </motion.div>

        </section>
    );
}