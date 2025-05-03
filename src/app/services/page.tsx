import Image from "next/image";

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
        <div className="flex items-end  mb-10 md:mb-20 flex-wrap">
          <div className="flex flex-col  w-[90%] md:w-[60%] h-[30vh] justify-end ">
            <h1 className="w-full text-7xl md:text-8xl ">OUR</h1>
            <h1 className="w-full text-7xl md:text-8xl ">SERVICES</h1>
          </div>
          <p className=" w-[100%] md:w-[30%] text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            perferendis, quidem numquam libero itaque animi adipisci, quasi
            eveniet iusto mollitia ex nesciunt, id officia rem nihil
            voluptatibus quisquam vel eligendi.
          </p>
        </div>
        {services.map((service, index) => (
          <div key={index} className="w-full flex mb-10 md:mb-20 flex-wrap">
            <Image
              className=" w-full md:flex-1"
              src={service.image}
              alt={`${service.title} Image`}
              width={100}
              height={100}
              objectFit="cover"
            />
            <div className="flex flex-col flex-1 gap-4 pt-5 md:pt-0 pl-2 md:pl-10 justify-end">
              <h3 className="text-4xl">{service.title}</h3>
              <ul
                className="list-disc pl-5"
                style={{ listStyleType: "disc", color: "#22c55e" }}
              >
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
