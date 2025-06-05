"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchData } from "@/utils/api";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
interface ServiceItem {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  image: {
    url: string;
  };
  service_items: ServiceItem[];
}

interface ServiceSection {
  description: string;
}

export default function Services() {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [serviceSectionData, setServiceSectionData] = useState<ServiceSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchData("/services");
        const serviceSectionData = await fetchData("/service-section");
        setServicesData(data);
        setServiceSectionData(serviceSectionData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div className="flex-grow pb-[100vh]"><Loader /></div>;
  }

  if (!servicesData || servicesData.length === 0) {
    return <div>No services found</div>;
  }

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
           {serviceSectionData?.description}
          </motion.p>
        </motion.div>
        {servicesData.map((service, index) => {
          const imageUrl = service.image.url;
          const fullImageUrl = `${process.env.NEXT_PUBLIC_ASSETS}${imageUrl}`;
          return (
            <motion.div
              key={service.id}
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
                  src={fullImageUrl}
                  alt={`${service.name} Image`}
                  width={600}
                  height={600}
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
                <h3 className="text-4xl">{service.name}</h3>
                <ul
                  className="list-disc pl-5"
                  style={{ listStyleType: "disc", color: "#22c55e" }}
                >
                  {service.service_items.map((item, itemIndex) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-white">{item.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
