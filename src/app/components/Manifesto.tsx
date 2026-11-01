"use client";

import { motion } from "framer-motion";

type Stat = { number: number; label: string };

export const Manifesto = ({ stats }: { stats: Stat[] }) => {
  const visibleStats = stats.filter((stat) => stat.number > 0);

  return (
    <section
      aria-label="Manifesto"
      className="grid grid-cols-1 gap-5 pt-12 pb-20 md:pt-20 md:pb-32 lg:grid-cols-[220px_1fr] lg:gap-10"
    >
      <span className="text-xs uppercase tracking-[0.14em] text-[#A9A59B]">
        (01)&nbsp;&nbsp;About
      </span>

      <div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1020px] text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.04] tracking-[-0.01em] text-[#ECE8DF]"
        >
          Every piece starts with a{" "}
          <em className="text-[#A9A59B]">question</em> and ends with an image
          you <em className="text-[#A9A59B]">remember.</em>
        </motion.h2>

        {visibleStats.length > 0 && (
          <div className="mt-10 grid grid-cols-3 gap-6 md:mt-[72px] md:flex md:gap-24">
            {visibleStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="border-t border-[#2A2925] pt-[18px] md:min-w-[180px]"
              >
                <strong className="block text-[44px] leading-none font-normal text-[#ECE8DF] md:text-[64px]">
                  {stat.number}
                </strong>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] text-[#A9A59B]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
