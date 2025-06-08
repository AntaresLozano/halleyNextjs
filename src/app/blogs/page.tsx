'use client'
import { BlogList } from "./components/BlogList";
import { Blog } from "./interfaces/blog.interface";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/api";
import { Loader } from "../components/Loader";

interface ApiBlog {
  id: string;
  mainImage: {
    url: string;
  };
  title: string;
  shortDescription: string;
  topic: string;
  date: string;
  slug: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchData("/blogs");
        if (data) {
          const formattedBlogs = data.map((blog: ApiBlog) => ({
            id: blog.id,
            img: `${process.env.NEXT_PUBLIC_ASSETS}${blog.mainImage.url}`,
            title: blog.title,
            description: blog.shortDescription,
            topic: blog.topic,
            date: blog.date,
            slug: blog.slug,
          }));
          setBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div className='flex-grow pb-[100vh]'><Loader /></div>;
  }

  return (
    <div className="w-screen pt-[20vh]  md:pt-[30vh] flex flex-col items-center">
      <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="text-white text-center text-5xl md:text-9xl mb-0 md:mb-8">
        AUDIOVISUAL BLOG
      </motion.h1>
      <BlogList blogs={blogs} />
    </div>
  );
}
