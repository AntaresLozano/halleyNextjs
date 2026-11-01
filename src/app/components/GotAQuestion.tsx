"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Anton, IBM_Plex_Mono, Newsreader } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400" });
const newsreader = Newsreader({ subsets: ["latin"], weight: "400" });

export const GotAQuestion = ({ message }: { message: string }) => {
  return (
    <section
      aria-labelledby="got-a-question"
      className="relative z-10 overflow-hidden bg-[#00FF7F] px-[18px] pt-[60px] pb-[50px] text-[#0D0D0D] md:px-10 md:pt-[90px] md:pb-[70px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: 4 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-[70px] right-10 hidden aspect-[9/16] w-[220px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:block"
      >
        <Image
          src="/images/cta-still.jpg"
          alt=""
          fill
          sizes="220px"
          className="object-cover"
        />
      </motion.div>

      <span
        className={`${plexMono.className} text-xs uppercase tracking-[0.04em]`}
      >
        Ch.05 — Your turn
      </span>

      <motion.h2
        id="got-a-question"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${anton.className} mt-5 text-[clamp(5.5rem,16.4vw,14.75rem)] leading-[0.86] uppercase`}
      >
        Got a
        <br />
        question?
      </motion.h2>

      <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <p
          className={`${newsreader.className} max-w-[540px] text-[19px] leading-[1.35] md:text-2xl`}
        >
          {message} Tell me what you’re looking for and we’ll turn it into an
          image people remember.
        </p>
        <Link
          href="/contact"
          className={`${plexMono.className} rounded-full bg-[#0D0D0D] px-[34px] py-[22px] text-sm uppercase text-[#EEECE5] transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]`}
        >
          Start a project ↗
        </Link>
      </div>
    </section>
  );
};
