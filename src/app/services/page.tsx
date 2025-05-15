"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const services = [
  {
    title: "PRE-PRODUCTION",
    image: "/images/service1.png",
    items: [
      "Scriptwriting and Storyboarding",
      "Location Scouting and Management",
      "Casting and Talent Management",
      "Equipment Rental and Logistics",
      "Permitting and Compliance",
    ],
  },
  {
    title: "PRODUCTION",
    image: "/images/service2.png",
    items: [
      "Cinematography and Camera Operation",
      "Sound Recording and Design",
      "Lighting and Grip Services",
      "Set Design and Construction",
      "Production Management",
    ],
  },
  {
    title: "POST-PRODUCTION",
    image: "/images/service3.png",
    items: [
      "Video Editing and Color Grading",
      "Sound Mixing and Mastering",
      "Visual Effects and Animation",
      "Motion Graphics and Titles",
      "Final Delivery and Distribution",
    ],
  },
];

export default function Services() {
  return (
    <>
      <div className="mx-4 md:mx-10  mt-10 md:mt-40 mb-20">
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
              SERVICES
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
            eveniet iusto mollitia ex nesciunt, id officia rem nihil
            voluptatibus quisquam vel eligendi.
          </motion.p>
        </motion.div>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="w-full flex mb-10 md:mb-20 flex-wrap"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full md:flex-1"
            >
              <Image
                className=" w-full md:flex-1"
                src={service.image}
                alt={`${service.title} Image`}
                width={100}
                height={100}
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col flex-1 gap-4 pt-5 md:pt-0 pl-2 md:pl-10 justify-end"
            >
              <h3 className="text-4xl">{service.title}</h3>
              <ul
                className="list-disc pl-5"
                style={{ listStyleType: "disc", color: "#22c55e" }}
              >
                {service.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-white">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
