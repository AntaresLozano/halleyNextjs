"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  name: string;
}

export const ServicesSlider = ({ allServiceItemsData }: { allServiceItemsData: Service[] }) => {
  const [enableLoop, setEnableLoop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let slidesThatFit = 0;

      if (screenWidth >= 1024) slidesThatFit = 3;
      else if (screenWidth >= 768) slidesThatFit = 2;
      else slidesThatFit = 1;

      setEnableLoop(allServiceItemsData.length > slidesThatFit);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-2" dir="rtl">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView="auto"
        loop={enableLoop}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="px-4"
      >
        {allServiceItemsData.map((service) => (
          <SwiperSlide key={service.id} className="!w-auto">
            <a
              className="px-4 py-2 inline-flex justify-center items-center gap-2 bg-white rounded-full whitespace-nowrap"
              href={`/services/${service.id}`}
            >
              <Image
                src="/images/arrow-right.svg"
                alt="arrow"
                width={20}
                height={20}
                className="w-[13] md:w-[20]"
              />
              <h3 className=" text-xs  md:text-base text-black">
                {service.name.toUpperCase()}
              </h3>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
