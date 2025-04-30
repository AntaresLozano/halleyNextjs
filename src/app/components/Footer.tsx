import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-screen  flex flex-col bg-[#00FF7F]">
      <div className=" flex flex-col px-16 ">
        <div className="flex w-full py-7 ">
          <div className=" flex flex-1">
            <div className="w-1/2">
              <Image
                src="/images/logo-black-text.svg"
                width={150}
                height={100}
                alt="logo"
              />
            </div>
            <div className="flex flex-col w-1/2 text-black">
              <Link href="/" className="text-md">
                HOME
              </Link>
              <Link href="/" className="text-md">
                SERVICES
              </Link>
              <Link href="/" className="text-md">
                PORTFOLIO
              </Link>
              <Link href="/" className="text-md">
                BLOG
              </Link>
              <Link href="/" className="text-md">
                CONTACT
              </Link>
            </div>
          </div>
          <div className="flex-1 flex-col">
            <h3 className="text-2xl text-black mb-4">
              SIGN UP TO GET ALL NEWS
            </h3>
            <div className="flex gap-1 h-12">
              <input
                type="email"
                placeholder="EMAIL"
                className="flex-1 h-full bg-white text-black pl-4"
              />
              <button className="text-white  h-full bg-black px-6 py-2">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 h-15 text-black justify-end  ">
          <div className="w-1/2 flex gap-16 py-5">
            <Link href="/" className="text-md">
              INSTAGRAM
            </Link>
            <Link href="/" className="text-md">
              TIKTOK
            </Link>
            <Link href="/" className="text-md">
              BEHANCE
            </Link>
            <Link href="/" className="text-md">
              YOUTUBE
            </Link>
            <Link href="/" className="text-md">
              FACEBOOK
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full px-8 py-5 text-black border-t-1 border-black">
        <Link href="/contact">CONTACT</Link>
      </div>
    </div>
  );
};
