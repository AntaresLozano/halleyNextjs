"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  slug: string;
  img: string;
  topic: string;
}

const projects: Project[] = [
  {
    title: "Proyecto Uno",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet tellus at dolor scelerisque facilisis.",
    slug: "proyecto-uno",
    img: "/images/service1.png",
    topic: "Web Development",
  },
  {
    title: "Proyecto Dos",
    description:
      "Suspendisse sit amet sapien nec est tempus aliquet. Aenean volutpat turpis nec elit bibendum eleifend.",
    slug: "proyecto-dos",
    img: "/images/service2.png",
    topic: "App Design",
  },
  {
    title: "Proyecto Tres",
    description:
      "Donec accumsan nulla nec sem vehicula, a luctus quam sollicitudin.",
    slug: "proyecto-tres",
    img: "/images/service3.png",
    topic: "E-commerce",
  },
  {
    title: "Proyecto Cuatro",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
    slug: "proyecto-cuatro",
    img: "/images/service1.png",
    topic: "Branding",
  },
  {
    title: "Proyecto Cinco",
    description:
      "Mauris in commodo justo. Donec vitae metus vel lacus lacinia sollicitudin.",
    slug: "proyecto-cinco",
    img: "/images/service2.png",
    topic: "UI/UX",
  },
  {
    title: "Proyecto Seis",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    slug: "proyecto-seis",
    img: "/images/service3.png",
    topic: "Mobile App",
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

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
        <div
          className="w-full md:w-[80%] h-[50vh] md:h-[70vh] relative"
          style={{
            backgroundImage: `url('${selectedProject.img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute left-3 bottom-3 w-[90%] md:w-[45%] h-auto bg-black/30 backdrop-blur-sm flex items-center p-4 md:p-0 md:h-[30%]">
            <div className="text-white px-2 md:px-5 py-2 md:py-6">
              <h2 className="text-xl md:text-2xl">{selectedProject.title}</h2>
              <p className="text-sm md:text-base leading-relaxed mb-1">
                {selectedProject.description}
              </p>
              <div className="flex w-full justify-end">
                <Link
                  href={`/projects/${selectedProject.slug}`}
                  className="text-white underline hover:text-gray-300 transition text-sm"
                >
                  Ver proyecto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Miniaturas */}
        <div
          className="flex md:flex-col overflow-x-scroll md:overflow-y-scroll gap-4 w-full md:w-auto"
          style={{
            scrollbarColor: "#22c55e #222",
            scrollbarWidth: "thin",
            maxHeight: "70vh",
          }}
        >
          {projects.map((project, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              src={project.img}
              alt={project.title}
              onClick={() => setSelectedProject(project)}
              className={`min-w-[100px] md:min-w-0 w-[100px] h-28 md:w-full md:h-36 object-cover mb-2 cursor-pointer hover:scale-105 hover:brightness-110 transition-transform duration-200 ${
                selectedProject.slug === project.slug
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
