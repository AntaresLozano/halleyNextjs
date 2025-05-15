"use client";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Link from "next/link";

export const Services = (serviceSectionData: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col mt-15 py-6 gap-3 md:flex-row md:justify-between md:gap-6">
      <div className="md:w-1/2 md:min-w-[50%]">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-5xl relative before:absolute before:top-[-15px] before:left-[-15px] before:w-8 before:h-8 before:bg-[url('/images/star.svg')] before:bg-contain before:bg-no-repeat before:transition-transform before:duration-300 hover:before:rotate-180 cursor-pointer"
        >
          <Link href="/services">{serviceSectionData.title}</Link>
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col gap-3 md:gap-6"
      >
        <p>{serviceSectionData.description}</p>
        <Button name="DISCOVER MORE" path="/services" />
      </motion.div>
    </div>
  );
};
