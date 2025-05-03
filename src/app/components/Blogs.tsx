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
  img: string;
  title: string;
  description: string;
  slug: string;
}

const blogs: Blog[] = [
  {
    id: "1",
    img: "/images/blog1.png",
    title: "Blog Title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    slug: "blog-title-1",
  },
  {
    id: "2",
    img: "/images/blog1.png",
    title: "Blog Title 2",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    slug: "blog-title-2",
  },
  {
    id: "3",
    img: "/images/blog1.png",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    slug: "blog-title-3",
  },
  {
    id: "4",
    img: "/images/blog1.png",
    title: "Blog Title 4",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    slug: "blog-title-4",
  },
  {
    id: "5",
    img: "/images/blog1.png",
    title: "Blog Title 5",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    slug: "blog-title-5",
  },
  {
    id: "6",
    img: "/images/blog1.png",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
    slug: "blog-title-3",
  },
];

export const Blogs = () => {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }} // Reduced duration for faster appearance
      className="py-20 mx-auto max-w-[95%] md:max-w-[80%]"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        // autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={blog.id}>
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }} // Reduced duration and delay for faster appearance
              onClick={() => router.push(`/blogs/${blog.slug}`)}
              className="block"
            >
              <motion.img 
                src={blog.img} 
                alt={blog.title} 
                className="mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }} // Reduced duration and delay for faster appearance
              />
              <motion.div 
                className="px-2 pt-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.15 }} // Reduced duration and delay for faster appearance
              >
                <h2 className="text-gray-300">{blog.title.toUpperCase()}</h2>
                <p className="text-gray-400">{blog.description}</p>
              </motion.div>
            </motion.a>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
