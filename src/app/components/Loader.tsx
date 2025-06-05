"use client";

import Image from "next/image";
import { motion } from "framer-motion";
export const Loader = () => {
  return (
    <div className="flex items-center justify-center fixed w-screen h-screen bg-[#1a1a1a] top-0 left-0 z-[100] mix-blend-exclusion">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        className="flex justify-center items-center"
      >
        <Image
          src={"/images/loader.png"}
          alt="Halley Cinema logo"
          className=""
          width={250}
          height={250}
        />
      </motion.div>
    </div>
  );
};
