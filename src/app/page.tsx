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

interface Service {
  id: string;
  name: string;
  description: string;
  image: { url: string };
}

async function getHeroData() {
  return await fetchData("/hero");
}
async function getAboutUsData() {
  return await fetchData("/aboutus");
}
async function getServiceSectionData() {
  return await fetchData("/service-section");
}
async function getServicesData() {
  return await fetchData("/services");
}
async function getBlogsData() {
  return await fetchData("/blogs");
}

export default async function Home() {
  const heroData = await getHeroData();
  const aboutUsData = await getAboutUsData();
  const serviceSectionData = await getServiceSectionData();
  const servicesData = await getServicesData();
  const blogsData = await getBlogsData();
  console.log(blogsData);
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
        <MessageSection />
      </div>
      <div className="relative">
        <Blogs blogsData={blogsData} />
        <h1 className=" absolute text-[10rem] top-[-70]  left-[-20] opacity-10 md:text-[40rem] xl:top-[-400] xl:text-[50rem]">
          BLOG
        </h1>
        <div className="absolute top-[] w-screen h-10 mt-10 pb-20">
          <ServicesSlider />
          <ServicesSliderLeft />
        </div>
      </div>
      <div className="px-3 mt-50 md:mt-0 md:px-13">
        <ContactSection />
      </div>
    </div>
  );
}
