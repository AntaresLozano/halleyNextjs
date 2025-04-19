'use client'
import Link from "next/link"
interface MenuProps {
  name: string;
  setShowMenu: (show: boolean) => void;
}

export const MenuItem = ({ name, setShowMenu }: MenuProps) => {
  return (
    <div className="w-full h-[12vh] text-white flex justify-between items-center px-20 hover:border-b-2 border-[#00FF7F] border-solid cursor-pointer relative after:hover:content-['.'] after:hover:absolute after:hover:right-20 after:hover:w-16 after:hover:h-16 after:hover:bg-[url('/arrow_up.svg')] after:hover:bg-cover after:hover:bg-no-repeat">
      <Link onClick={() => setShowMenu(false)} className="w-full" href={ name=="HOME"?"/":`/${name}`}>
        <h1 className="text-[#00FF7F] text-5xl">{name.toUpperCase()}</h1>
      </Link>
    </div>
  )
}