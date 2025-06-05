'use client'
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface MenuProps {
  name: string;
  delay: number;
  setShowMenu: (show: boolean) => void;
}

export const MenuItem = ({ name, delay, setShowMenu }: MenuProps) => {
  return (
    <motion.div 
      initial={{ x: '30%', opacity: 0 }}
      animate={{ x: '0%', opacity: 1 }}
      transition={{ duration: 0.2, delay: delay/10 }}
      className="group w-full h-[12vh] text-white flex justify-between items-center px-20 border-solid cursor-pointer relative hover:border-b-2 border-[#00FF7F]"
    >
      <Link 
        onClick={() => setShowMenu(false)} 
        className="w-full" 
        href={name === "HOME" ? "/" : `/${name}`}
      >
        <h1 className="text-[#00FF7F] text-5xl">{name.toUpperCase()}</h1>
      </Link>

      {/* Ícono SVG que aparece al hacer hover */}
      <div className="absolute right-20 hidden group-hover:block w-16 h-16">
        <Image width={64} height={64} src="/arrow_up.svg" alt="Flecha arriba"  objectFit="contain" />
      </div>
    </motion.div>
  )
}
