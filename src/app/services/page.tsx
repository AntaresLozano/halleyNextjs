"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchData } from "@/utils/api";
import { getImageUrl } from "@/utils/images";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { GotAQuestion } from "../components/GotAQuestion";

interface ServiceItem {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  description?: string | null;
  image: {
    url: string;
    alternativeText?: string | null;
  } | null;
  service_items: ServiceItem[];
}

interface ServiceSection {
  description: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** CMS description: line 1 = intro, line 2 = lead, line 3 = "Need something bigger?" pitch. */
function splitDescription(description = "") {
  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const crewIndex = lines.findIndex((line) => /something bigger/i.test(line));
  const crew = crewIndex >= 0 ? lines[crewIndex] : null;
  const rest = lines.filter((_, i) => i !== crewIndex);
  return { lead: rest.join(" "), crew };
}

export default function Services() {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [serviceSectionData, setServiceSectionData] = useState<ServiceSection | null>(null);
  const [contactMessage, setContactMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const [data, section, message] = await Promise.all([
          fetchData("/services"),
          fetchData("/service-section"),
          fetchData("/contact-message"),
        ]);
        setServicesData(data ?? []);
        setServiceSectionData(section);
        setContactMessage(message?.message ?? "Ready to bring your next project to life?");
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div className="flex-grow pb-[100vh]"><Loader /></div>;
  }

  if (!servicesData || servicesData.length === 0) {
    return <div className="px-4 pt-40 pb-20 md:px-10">No services found</div>;
  }

  const { lead, crew } = splitDescription(serviceSectionData?.description);
  const [crewTitle, ...crewRest] = (crew ?? "").split("?");
  const total = pad(servicesData.length);

  return (
    <>
      {/* ── Intro ─────────────────────────────── */}
      <section className="px-4 pt-32 pb-16 md:px-10 md:pt-48 md:pb-24 lg:px-13">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="block text-xs uppercase tracking-[0.14em] text-[#A9A59B]"
        >
          (02)&nbsp;&nbsp;Services
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-6 max-w-[1180px] text-[clamp(2.75rem,7.4vw,7.5rem)] leading-[0.98] tracking-[-0.02em] text-[#ECE8DF]"
        >
          From the first <em className="text-[#A9A59B]">question</em> to the
          final <em className="text-[#A9A59B]">cut.</em>
        </motion.h1>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-[520px] text-lg leading-relaxed text-[#CFCBC2] md:text-xl"
          >
            {lead}
          </motion.p>

          {/* Process index */}
          <motion.nav
            aria-label="Services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 border-t border-[#2A2925] sm:grid-cols-3"
          >
            {servicesData.map((service, index) => (
              <a
                key={service.id}
                href={`#${slug(service.name)}`}
                className="group relative flex items-center justify-between gap-4 border-b border-[#2A2925] py-5 sm:flex-col sm:items-start sm:justify-start sm:border-b-0 sm:py-6 sm:pr-6"
              >
                <span className="absolute -top-px left-0 h-px w-0 bg-[#00FF7F] transition-all duration-500 group-hover:w-full" />
                <span className="text-xs tracking-[0.14em] text-[#00FF7F]">
                  {pad(index + 1)} / {total}
                </span>
                <span className="flex-1 text-xl text-[#ECE8DF] transition-colors group-hover:text-white sm:flex-none md:text-2xl">
                  {service.name}
                </span>
                <span className="text-[#A9A59B] transition-transform duration-300 group-hover:translate-y-1 sm:mt-auto">
                  ↓
                </span>
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {/* ── Service chapters ──────────────────── */}
      <div className="px-4 md:px-10 lg:px-13">
        {servicesData.map((service, index) => {
          const reversed = index % 2 === 1;
          return (
            <motion.section
              key={service.id}
              id={slug(service.name)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="scroll-mt-28 grid grid-cols-1 gap-10 border-t border-[#2A2925] py-14 md:py-24 lg:grid-cols-12 lg:gap-14"
            >
              {/* Text */}
              <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
                <div className="lg:sticky lg:top-32">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_#00FF7F]">
                      {pad(index + 1)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.14em] text-[#A9A59B]">
                      Step {pad(index + 1)} / {total}
                    </span>
                  </div>

                  <h2 className="mt-8 text-[clamp(2.5rem,5vw,4.75rem)] leading-[1] tracking-[-0.01em] text-[#ECE8DF]">
                    {service.name}
                  </h2>

                  {service.description && (
                    <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-[#CFCBC2]">
                      {service.description}
                    </p>
                  )}

                  <ul className="mt-10 border-b border-[#2A2925]">
                    {service.service_items.map((item, itemIndex) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 + itemIndex * 0.08 }}
                        className="group grid grid-cols-[48px_1fr_auto] items-center border-t border-[#2A2925] py-4"
                      >
                        <span className="text-xs tracking-[0.14em] text-[#8A877F] transition-colors group-hover:text-[#00FF7F]">
                          {pad(itemIndex + 1)}
                        </span>
                        <span className="text-lg text-[#ECE8DF] md:text-xl">{item.name}</span>
                        <span className="text-[#A9A59B] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image */}
              <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-[#121210] lg:aspect-[5/6]">
                  <Image
                    src={getImageUrl(service.image)}
                    alt={service.image?.alternativeText || service.name}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-xs uppercase tracking-[0.14em] text-[#ECE8DF]">
                    <span>
                      <span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[#00FF7F] align-[1px] shadow-[0_0_10px_#00FF7F]" />
                      {service.name}
                    </span>
                    <span className="text-[#A9A59B]">
                      {pad(service.service_items.length)} disciplines
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* ── Crew band ─────────────────────────── */}
      {crew && (
        <section className="px-4 pb-24 md:px-10 md:pb-32 lg:px-13">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 items-end gap-10 border-t border-[#2A2925] pt-14 md:pt-20 lg:grid-cols-[1.4fr_1fr]"
          >
            <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] text-[#ECE8DF]">
              {crewTitle.trim()}
              <em className="text-[#A9A59B]">?</em>
            </h2>
            <div className="flex flex-col items-start gap-8">
              <p className="max-w-[480px] text-lg leading-relaxed text-[#CFCBC2]">
                {crewRest.join("?").trim()}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#00FF7F] px-7 py-4 text-black transition-colors hover:bg-[#3bff9c]"
              >
                BUILD MY CREW <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      <GotAQuestion message={contactMessage} />
    </>
  );
}
