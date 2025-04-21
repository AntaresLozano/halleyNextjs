'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-7">
      <div className=" h-20 flex bg-transparent border-b-2 border-gray-400 border-solid justify-between items-center">
        <Link href="/" className="md:px-7">
          <Image src="logo.svg" alt="Halley Cinema logo" width={100} height={100} />
        </Link>
        <button 
          className="px-4 py-2 cursor-pointer"
          onClick={() => setShowMenu(true)}
        >
          [*MENU]
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60]"
          >
            <Menu setShowMenu={setShowMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};