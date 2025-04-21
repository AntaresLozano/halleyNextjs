"use client";
import { useRef, useEffect, useState } from "react";

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
      <div className="relative" >
        <h1
          id="about"
          ref={aboutRef}
          className="text-5xl md:text-7xl relative inline-block z-10 before:absolute before:left-[-95px] before:top-1/2 before:h-[5px] before:w-[100px] before:bg-[url('/images/line.svg')] before:bg-contain before:bg-no-repeat before:transform before:-translate-y-1/2"
        >
          ABOUT US
        </h1>
        <div
          className="absolute h-[2px] top-1/2 pl-5 bg-white"
          style={{ left: `${linePosition + 10}px`, width: `calc(100vw - ${linePosition}px - 25px)` }}
        ></div>
      </div>
      <p className="text-xs md:text-lg md:max-w-[80%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi neque
        similique earum, quod alias atque voluptate sed, odio quibusdam
        provident repellat fugit repellendus, vero ullam. Consequatur
        dignissimos consectetur quisquam et!
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-center">
          <h3 className="text-4xl md:text-6xl">100</h3>
          <span className="text-xs md:text-md text-gray-500">PROYECTS</span>
        </div>
        <div className="flex flex-col text-center">
          <h3 className="text-4xl md:text-6xl">726</h3>
          <span className="text-xs md:text-md text-gray-500">CLIENTS</span>
        </div>
        <div className="flex flex-col text-center">
          <h3 className="text-4xl md:text-6xl">7</h3>
          <span className="text-xs md:text-md text-gray-500">COUNTRIES</span>
        </div>
        <div className="flex flex-col text-center">
          <h3 className="text-4xl md:text-6xl">4</h3>
          <span className="text-xs md:text-md text-gray-500">CREATIVES</span>
        </div>
      </div>
    </div>
  );
};