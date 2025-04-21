'use client'
import Link from "next/link"

interface MenuProps {
  name: string;
  setShowMenu: (show: boolean) => void;
}

export const MenuItem = ({ name, setShowMenu }: MenuProps) => {
  return (
    <div 
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
        <img src="/arrow_up.svg" alt="Flecha arriba" className="w-full h-full object-contain" />
      </div>
    </div>
  )
}
