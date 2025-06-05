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
    <div className="w-full flex flex-col bg-[#00FF7F]">
      <div className="flex flex-col px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row w-full py-7 gap-8">
          <div className="flex flex-col md:flex-row flex-1 gap-8">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/logo-black-text.svg"
                width={150}
                height={100}
                alt="logo"
                className="w-auto h-auto"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 text-black gap-2">
              <Link href="/" className="text-md hover:opacity-80">
                HOME
              </Link>
              <Link href="/" className="text-md hover:opacity-80">
                SERVICES
              </Link>
              <Link href="/" className="text-md hover:opacity-80">
                PORTFOLIO
              </Link>
              <Link href="/" className="text-md hover:opacity-80">
                BLOG
              </Link>
              <Link href="/" className="text-md hover:opacity-80">
                CONTACT
              </Link>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl md:text-2xl text-black mb-4">
              SIGN UP TO GET ALL NEWS
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 h-12">
              <input
                type="email"
                placeholder="EMAIL"
                className="flex-1 h-full bg-white text-black px-4"
              />
              <button className="text-white h-full bg-black px-6 py-2 hover:opacity-90 transition-opacity">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-end text-black">
          <div className="w-full md:w-1/2 flex flex-wrap gap-4 md:gap-16 py-5">
            {socialData.map((social) => (
              <Link key={social.id} href={social.link} target="_blank" className="text-md hover:opacity-80">
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 md:px-8 py-5 text-black border-t border-black">
        <Link href="/contact" className="hover:opacity-80">CONTACT</Link>
      </div>
    </div>
  );
};
