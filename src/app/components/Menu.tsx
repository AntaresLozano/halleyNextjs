"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  setShowMenu: (show: boolean) => void;
}

export const Menu = ({ setShowMenu }: MenuProps) => {
  return (
    <div className="flex flex-col fixed w-screen h-screen bg-black top-0 left-0 z-10">
      <div className="flex justify-between items-center w-full h-32 px-7 mb-4">
        <Link href="/">
          <Image
            src="green_logo.svg"
            alt="Halley Cinema logo"
            width={100}
            height={100}
          />
        </Link>
        <button
          className="px-4 py-2 cursor-pointer text-white"
          onClick={() => setShowMenu(false)}
        >
          X
        </button>
      </div>
      <MenuItem setShowMenu={setShowMenu} name="HOME" />
      <MenuItem setShowMenu={setShowMenu} name="services" />
      <MenuItem setShowMenu={setShowMenu} name="portfolio" />
      <MenuItem setShowMenu={setShowMenu} name="blog" />
      <MenuItem setShowMenu={setShowMenu} name="contact" />
    </div>
  );
};
