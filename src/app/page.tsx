'use client';

import { useEffect } from 'react';
import { AboutUs } from "./components/AboutUs";
import { Blogs } from "./components/Blogs";
import { Button } from "./components/Button";
import { ContactSection } from "./components/ContactSection";
import Hero from "./components/Hero";
import { MessageSection } from "./components/MessageSection";
import { Service } from "./components/Service";
import { Services } from "./components/Services";
import { ServicesSlider } from "./components/ServicesSlider";
import { ServicesSliderLeft } from "./components/ServicesSliderLeft";
import { fetchData } from "@/utils/api";
import { useAppContext } from '@/context/AppContext';
import { Loader } from "./components/Loader";
interface Service {
  id: string;
  name: string;
  description: string;
  image: { url: string };
}

export default function Home() {
  const {
    heroData,
    aboutUsData,
    serviceSectionData,
    servicesData,
    blogsData,
    messageSectionData,
    allServiceItemsData,
    setHeroData,
    setAboutUsData,
    setServiceSectionData,
    setServicesData,
    setBlogsData,
    setMessageSectionData,
    setAllServiceItemsData,
  } = useAppContext();

  useEffect(() => {
    const fetchAllData = async () => {
      const [hero, aboutUs, serviceSection, services, blogs, messageSection, allServiceItems] = await Promise.all([
        fetchData("/hero"),
        fetchData("/aboutus"),
        fetchData("/service-section"),
        fetchData("/services"),
        fetchData("/blogs"),
        fetchData("/contact-message"),
        fetchData("/service-items")
      ]);

      setHeroData(hero);
      setAboutUsData(aboutUs);
      setServiceSectionData(serviceSection);
      setServicesData(services);
      setBlogsData(blogs);
      setMessageSectionData(messageSection);
      setAllServiceItemsData(allServiceItems);
    };

    fetchAllData();
  }, []);

  if (!heroData || !aboutUsData || !serviceSectionData || !servicesData || !blogsData || !messageSectionData || !allServiceItemsData) {
    return <div className='flex-grow pb-[100vh]' ><Loader /></div>;
  }

  return (
    <div>
      <Hero heroData={heroData} />
      <div className="px-3 md:px-13">
        <AboutUs aboutUsData={aboutUsData} />
        <Services
          title={serviceSectionData.title}
          description={serviceSectionData.description}
        />
        {servicesData.map((service: Service) => (
          <Service
            key={service.id}
            name={service.name}
            description={service.description}
            img={service.image}
          />
        ))}
        <div className="w-full flex justify-center py-20 items-center">
          <Button name="DISCOVER MORE" path="/services" />
        </div>
        <MessageSection messageSectionData={messageSectionData.message} />
      </div>
      <div className="relative">
        <Blogs blogsData={blogsData} getProjects={false} />
        <h1 className=" absolute text-[10rem] top-[-70]  left-[-20] opacity-10 md:text-[40rem] xl:top-[-400] xl:text-[50rem]">
          BLOG
        </h1>
        <div className="absolute top-[] w-screen h-10 mt-10 pb-20">
          <ServicesSlider allServiceItemsData={allServiceItemsData} />
          <ServicesSliderLeft allServiceItemsData={allServiceItemsData} />
        </div>
      </div>
      <div className="px-3 mt-50 md:mt-0 md:px-13">
        <ContactSection />
      </div>
    </div>
  );
}
