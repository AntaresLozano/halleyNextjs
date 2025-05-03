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

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="px-3 md:px-13">
        <AboutUs />
        <Services />
        <Service
          name="VIDEO PRODUCTION"
          description="High - quality filming & storytelling"
          img="/images/service1.png"
        />
        <Service
          name="post PRODUCTION"
          description="editing, color grading & vfx"
          img="/images/service2.png"
        />
        <Service
          name="Photography"
          description="Stunning Images for your brand"
          img="/images/service3.png"
        />
        <div className="w-full flex justify-center py-20 items-center">
          <Button name="DISCOVER MORE" path="/services" />
        </div>
        <MessageSection />
      </div>
      <div className="relative">
        <Blogs />
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
