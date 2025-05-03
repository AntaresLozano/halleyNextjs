'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Service = ({ name, description, img }: { name: string; description: string, img:string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const mobileHeight = useTransform(scrollYProgress, [0, 0.5], [192, 96]); // 48rem to 24rem
  const desktopHeight = useTransform(scrollYProgress, [0.8, 0.5], [110,296]); // 64rem to 32rem

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-10 border-t-2 border-white flex flex-col md:flex-row md:justify-between"
    >
      <motion.img 
        src={img} 
        alt="" 
        className="md:hidden w-full object-cover"
        style={{ height: mobileHeight }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div 
        className="flex flex-col md:w-1/3"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-5xl pb-0.5">{name.toUpperCase()}</h2>
        <span className="text-xs md:text-lg">{description.toUpperCase()}</span>
      </motion.div>
      <motion.img 
        src={img} 
        alt="" 
        className="hidden md:block w-1/2 object-cover"
        style={{ height: desktopHeight }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>
  );
};
