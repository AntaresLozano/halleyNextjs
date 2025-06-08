"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  isProject: boolean;
  mainImage: { url: string };
  title: string;
  shortDescription: string;
  slug: string;
}

export const Blogs = ({ blogsData, getProjects }: { blogsData: Blog[], getProjects: boolean }) => {
  const router = useRouter();

  console.log("blogsData---->", blogsData);
  
  const filteredBlogs = getProjects ? blogsData : blogsData.filter((blog) => blog.isProject == false);
  console.log("filteredBlogs---->", filteredBlogs);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 mx-auto max-w-[95%] md:max-w-[80%]"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {filteredBlogs.map((blog, index) => (
          <SwiperSlide key={blog.id}>
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => router.push(`/blogs/${blog.slug}`)}
              className="block"
            >
              <div className="relative h-[300px] w-full">
                <motion.img 
                  src={`${process.env.NEXT_PUBLIC_ASSETS}${blog.mainImage.url}`}
                  alt={blog.title} 
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
                />
              </div>
              <motion.div 
                className="px-2 pt-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.15 }}
              >
                <h2 className="text-gray-300">{blog.title.toUpperCase()}</h2>
                <p className="text-gray-400">{blog.shortDescription}</p>
              </motion.div>
            </motion.a>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
