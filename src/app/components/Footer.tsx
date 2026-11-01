"use client";
import { fetchData } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Social {
  id: string;
  name: string;
  link: string;
}

const linkClass =
  "text-md text-white transition-colors duration-200 hover:text-[#00FF7F] focus-visible:text-[#00FF7F] focus-visible:outline-none";

export const Footer = () => {
  const [socialData, setSocialData] = useState<Social[]>([]);

  useEffect(() => {
    const fetchSocialData = async () => {
      const data = await fetchData("/socials");
      setSocialData(data);
    };
    fetchSocialData();
  }, []);

  return (
    <div className="w-full flex flex-col bg-[#0D0D0D] text-white">
      <div className="flex flex-col px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row w-full py-7 gap-8">
          <div className="flex flex-col md:flex-row flex-1 gap-8">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/logo-white-text.svg"
                width={150}
                height={100}
                alt="Halley Cinema"
                className="w-auto h-auto"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-2">
              <Link href="/" className={linkClass}>
                HOME
              </Link>
              <Link href="/services" className={linkClass}>
                SERVICES
              </Link>
              <Link href="/portfolio" className={linkClass}>
                PORTFOLIO
              </Link>
              <Link href="/blogs" className={linkClass}>
                BLOG
              </Link>
              <Link href="/contact" className={linkClass}>
                CONTACT
              </Link>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl md:text-2xl text-white mb-4">
              SIGN UP TO GET ALL NEWS
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:h-12">
              <input
                type="email"
                placeholder="EMAIL"
                aria-label="Email"
                className="w-full sm:w-auto sm:flex-1 h-12 sm:h-full bg-transparent border border-white/40 text-white placeholder:text-white/60 px-4 outline-none focus:border-[#00FF7F]"
              />
              <button className="h-12 sm:h-full bg-[#00FF7F] text-black px-6 py-2 hover:bg-[#3bff9c] transition-colors">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-end">
          <div className="w-full md:w-1/2 flex flex-wrap gap-4 md:gap-16 py-5">
            {socialData?.map((social) => (
              <Link key={social.id} href={social.link} target="_blank" className={linkClass}>
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 md:px-8 py-5 border-t border-white/20">
        <Link href="/contact" className={linkClass}>
          CONTACT
        </Link>
      </div>
    </div>
  );
};
