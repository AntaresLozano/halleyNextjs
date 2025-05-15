"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  setShowMenu: (show: boolean) => void;
}

export const Menu = ({ setShowMenu }: MenuProps) => {
  return (
    <div className="flex flex-col fixed w-screen h-screen bg-black top-0 left-0 z-50">
      <div className="flex justify-between items-center w-full h-32 px-7 mb-4 md:px-20  ">
        <Link href="/"
         onClick={() => setShowMenu(false)} 
        >
          <Image
            src="green_logo.svg"
            alt="Halley Cinema logo"
            width={100}
            height={100}
          />
        </Link>
        <button
          className="px-4 py-2 cursor-pointer text-[#00FF7F] font-bold text-2xl pb-5"
          onClick={() => setShowMenu(false)}
        >
          X
        </button>
      </div>
      {["HOME", "services", "portfolio", "blogs", "contact"].map((name, index) => (
        <MenuItem key={name} setShowMenu={setShowMenu} name={name} delay={index} />
      ))}
      <div className="w-4/5 h-16 flex flex-wrap justify-center pt-6 gap-3.5 max-w-[70vw] self-center">
        <a
          className="text-[#00FF7F] hover:text-white text-sm md:text-base"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </a>
        <a
          className="text-[#00FF7F] hover:text-white text-sm md:text-base"
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TIKTOK
        </a>
        <a
          className="text-[#00FF7F] hover:text-white text-sm md:text-base"
          href="https://www.behance.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          BEHANCE
        </a>
        <a
          className="text-[#00FF7F] hover:text-white text-sm md:text-base"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          YOUTUBE
        </a>
        <a
          className="text-[#00FF7F] hover:text-white text-sm md:text-base"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          FACEBOOK
        </a>
      </div>
    </div>
  );
};
