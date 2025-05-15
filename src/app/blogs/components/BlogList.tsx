"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Blog } from "../interfaces/blog.interface";
import { motion } from "framer-motion";

interface BlogsProps {
  blogs: Blog[];
}

export const BlogList = ({ blogs }: BlogsProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Filtrar blogs por búsqueda y topic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic =
      selectedTopic === "ALL" || blog.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Topics disponibles
  const topics = ["ALL", "VIDEO PRODUCTION", "POST PRODUCTION", "PHOTOGRAPHY"];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        <div className="w-full flex flex-col items-center gap-4 mb-6">
          <div className="w-full md:w-4/6 h-16 bg-transparent border-2 border-white text-white text-2xl flex py-2">
            <div className="w-16 border-r-2 border-white h-full flex items-center justify-center">
              <Image
                src="/images/search.svg"
                width={30}
                height={10}
                alt="search"
                className="object-contain"
              />
            </div>
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full bg-transparent text-white text-2xl pl-4 mb-2 focus:outline-none"
            />
          </div>
          <div className="flex w-full md:w-auto gap-4 items-center overflow-x-auto scrollbar-hide">
            <span className="text-white text-2xl">TOPIC:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                className={`text-center px-7 py-3 text-2xl whitespace-nowrap cursor-pointer hover:bg-[#00FF7F] hover:text-black transition-all duration-300 ${
                  selectedTopic === topic
                    ? "bg-[#00FF7F] text-black"
                    : " text-white border border-gray-300"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid de blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className=" rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300  border-1 border-white"
            onClick={() => router.push(`/blogs/${blog.slug}`)}
          >
            <div className="relative h-48">
              <Image
                src={blog.img}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-gray-500">{blog.date}</span>
              <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
              <p className="text-gray-200 mt-2 line-clamp-3">
                {blog.description}
              </p>
              <div className="mt-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {blog.topic}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === page ? "bg-[#00FF7F] text-black" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
