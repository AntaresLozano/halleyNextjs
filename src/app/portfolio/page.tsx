"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/api";
import { Loader } from "../components/Loader";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  mainImage: { url: string };
  topic: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetchData("/blogs?filters[isProject][$eq]=true");
      if (data) {
        setProjects(data);
        setSelectedProject(data[0]);
      }
    };
    fetchProjects();
  }, []);

  if (!projects) {
    return <div className='flex-grow pb-[100vh]' ><Loader /></div>;
  }

  return (
    <div className="mx-4 md:mx-10 mt-10 md:mt-40 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-end  mb-10 md:mb-20 flex-wrap"
      >
        <div className="flex flex-col  w-[90%] md:w-[60%] h-[30vh] justify-end ">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full text-7xl md:text-8xl"
          >
            OUR
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full text-7xl md:text-8xl"
          >
            PROJECTS
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-[100%] md:w-[30%] text-lg"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          perferendis, quidem numquam libero itaque animi adipisci, quasi
          eveniet iusto mollitia ex nesciunt, id officia rem nihil voluptatibus
          quisquam vel eligendi.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col md:flex-row gap-6"
      >
        {selectedProject && (
          <>
            <div
              className="w-full md:w-[80%] h-[50vh] md:h-[70vh] relative"
              style={{
                backgroundImage: `url('${process.env.NEXT_PUBLIC_ASSETS}${selectedProject.mainImage.url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute left-3 bottom-3 w-[90%] md:w-[45%] h-auto bg-black/30 backdrop-blur-sm flex items-center p-4 md:p-0 md:h-[30%]">
                <div className="text-white px-2 md:px-5 py-2 md:py-6">
                  <h2 className="text-xl md:text-2xl">{selectedProject.title}</h2>
                  <p className="text-sm md:text-base leading-relaxed mb-1">
                    {selectedProject.shortDescription}
                  </p>
                  <div className="flex w-full justify-end">
                    <Link
                      href={`/blogs/${selectedProject.slug}`}
                      className="text-white underline hover:text-gray-300 transition text-sm"
                    >
                      Ver proyecto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Miniaturas */}
        <div
          className="flex md:flex-col overflow-x-scroll md:overflow-y-scroll gap-4 w-full md:w-auto"
          style={{
            scrollbarColor: "#22c55e #222",
            scrollbarWidth: "thin",
            maxHeight: "70vh",
          }}
        >
          {projects.map((project) => (
            <Image
              key={project.id}
              width={100}
              height={100}
              src={`${process.env.NEXT_PUBLIC_ASSETS}${project.mainImage.url}`}
              alt={project.title}
              onClick={() => setSelectedProject(project)}
              className={`min-w-[100px] md:min-w-0 w-[100px] h-28 md:w-full md:h-36 object-cover mb-2 cursor-pointer hover:scale-105 hover:brightness-110 transition-transform duration-200 ${
                selectedProject!.id === project.id
                  ? "border-1 border-green-500"
                  : ""
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
