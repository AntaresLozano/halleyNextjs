"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "./Menu";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const borderOpacity = Math.max(0, 1 - (scrollY / 100));

  return (
    <div className="">
      <div className={` fixed top-0 left-0 w-full z-20 px-7 ${isHomePage && 'mix-blend-exclusion'}`}>
        <div
          className={` h-20 flex bg-transparent border-b-2 ${
            !isHomePage ? "border-[#00FF7F] " : "border-gray-400"
          } border-solid justify-between items-center `}
          style={{ borderColor: `${!isHomePage ? '#00FF7F' : '#9CA3AF'}${Math.round(borderOpacity * 255).toString(16).padStart(2, '0')}` }}
        >
          <Link href="/" className="md:px-7 ">
            <Image
              src={!isHomePage ? "/logo_green_solo.svg": "/logo_white.svg"}
              alt="Halley Cinema logo"
              className=""
              width={100}
              height={100}
            />
          </Link>
          <button
            className={`${!isHomePage && "text-[#00FF7F]"} px-4 py-2 cursor-pointer`}
            onClick={() => setShowMenu(true)}
          >
            [*MENU]
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60]"
          >
            <Menu setShowMenu={setShowMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
