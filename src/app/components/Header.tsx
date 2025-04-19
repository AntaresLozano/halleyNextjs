"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";
export const Header = () => {
const [ showMenu, setShowMenu ] = useState(false)

  return (
    showMenu?
    <Menu setShowMenu={setShowMenu} />:
    <div className="w-100vw h-20 flex bg-transparent border-b-2 border-gray-400 border-solid justify-between items-center sticky top-0">
      <Link href="/" ><Image src="logo.svg" alt="Halley Cinema logo"  width={100} height={100}/></Link>
      <button className="px-4 py-2 cursor-pointer" onClick={() => setShowMenu(true)}>[*MENU]</button>
    </div>
  );
};
