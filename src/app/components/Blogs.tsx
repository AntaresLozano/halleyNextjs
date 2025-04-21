"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

interface Blog {
  id: string;
  img: string;
  title: string;
  description: string;
}

const blogs: Blog[] = [
  {
    id: "1",
    img: "/images/blog1.png",
    title: "Blog Title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
  },
  {
    id: "2",
    img: "/images/blog1.png",
    title: "Blog Title 2",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
  },
  {
    id: "3",
    img: "/images/blog1.png",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
  },
  {
    id: "4",
    img: "/images/blog1.png",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
  },
  {
    id: "5",
    img: "/images/blog1.png",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
  },
  {
    id: "6",
    img: "/images/blog1.png",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque rerum ea error, quae voluptate temporibus necessitatibus nemo mollitia earum fuga voluptatibus qui consectetur optio numquam tempore quia saepe a sint",
  },
];

export const Blogs = () => {
  return (
    <div className="py-20 max-w-[80%] mx-auto">
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
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id} className="">
            <a href={`/blogs/${blog.id}`}>
              <img src={blog.img} alt={blog.title} className="mx-auto" />
              <div className="px-10 pt-5 ">
                <h2 className="text-gray-300">{blog.title.toUpperCase()}</h2>
                <p className="text-gray-400">{blog.description}</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
