'use client';
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative flex justify-center items-end w-screen h-screen bg-cover bg-[url(/images/hero.png)] bg-top">
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent"></div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-white relative z-10 w-[80%] h-[50%] text-center flex flex-col items-center pb-8 gap-6 md:h-[40%] md:w-1/2 lg:w-1/2"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl"
        >
          HALLEY CINEMA
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          provident odio hic dignissimos mollitia unde at sapiente facere? Velit
          ad soluta vero qui harum id saepe dolorem maxime maiores adipisci!
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          href="/contact"
          className="text-black px-6 py-3 bg-[#00FF7F] hover:bg-[#3bff9c] cursor-pointer"
        >
          CONTACT US
        </motion.a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Image
          src="/images/arrow-down.svg"
          alt="Scroll down"
          width={50}
          height={50}
          className=" w-6 bottom-8 left-8 absolute  transform -translate-x-1/2 md:w-[50px] md:bottom-16 md:left-16"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
