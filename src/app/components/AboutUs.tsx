"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AboutUs = () => {
  const aboutRef = useRef(null);
  const [linePosition, setLinePosition] = useState(355); // Valor inicial por defecto

  useEffect(() => {
    if (aboutRef.current) {
      // Obtener el ancho del elemento "about"
      const aboutWidth = aboutRef.current.offsetWidth - 0;
      console.log("aboutWidth", aboutWidth);
      // Calcular la posición izquierda para la línea (ancho + margen)
      const newPosition = aboutWidth + 5; // Ajusta el margen según necesites
      setLinePosition(newPosition);
    }
  }, []); // El array vacío asegura que esto solo se ejecute una vez después del montaje

  return (
    <div className="w-full h-[35vh] flex flex-col gap-6 text-white py-6">
      <div className="relative">
        <motion.h1
          id="about"
          ref={aboutRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl relative inline-block z-10 before:absolute before:left-[-95px] before:top-1/2 before:h-[5px] before:w-[100px] before:bg-[url('/images/line.svg')] before:bg-contain before:bg-no-repeat before:transform before:-translate-y-1/2"
        >
          ABOUT US
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute h-[2px] top-1/2 pl-5 bg-white"
          style={{ left: `${linePosition + 10}px`, width: `calc(100vw - ${linePosition}px - 25px)` }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-xs md:text-lg md:max-w-[80%]"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi neque
        similique earum, quod alias atque voluptate sed, odio quibusdam
        provident repellat fugit repellendus, vero ullam. Consequatur
        dignissimos consectetur quisquam et!
      </motion.p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { number: "100", label: "PROYECTS" },
          { number: "726", label: "CLIENTS" },
          { number: "7", label: "COUNTRIES" },
          { number: "4", label: "CREATIVES" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            className="flex flex-col text-center"
          >
            <h3 className="text-4xl md:text-6xl">{item.number}</h3>
            <span className="text-xs md:text-md text-gray-500">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};