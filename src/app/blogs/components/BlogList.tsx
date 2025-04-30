"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Blog } from "../interfaces/blog.interface";

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
    <div className="container mx-auto px-4 py-12">
      {/* Filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            {topics.map((topic) => (
              <button
                key={topic}
                className={`px-4 py-2 rounded-md ${
                  selectedTopic === topic
                    ? "bg-[#00FF7F] text-black"
                    : "bg-white text-black border border-gray-300"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => router.push(`/blog/${blog.id}`)}
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
              <p className="text-gray-600 mt-2 line-clamp-3">
                {blog.description}
              </p>
              <div className="mt-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {blog.topic}
                </span>
              </div>
            </div>
          </div>
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
