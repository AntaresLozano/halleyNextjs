export const Hero = () => {
  return (
    <div className="relative  flex  justify-center items-end w-screen h-screen bg-cover bg-[url(/images/hero.png)] bg-top">
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent"></div>
      <div className="text-white relative z-10 w-[80%] h-[50%] text-center flex flex-col items-center pb-8 gap-6  md:h-[40%] md:w-1/2 lg :w-1/2">
        <h1 className="text-5xl md:text-7xl">HALLEY CINEMA</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          provident odio hic dignissimos mollitia unde at sapiente facere? Velit
          ad soluta vero qui harum id saepe dolorem maxime maiores adipisci!
        </p>
        <a href="/contact" className="text-black px-6 py-3 bg-[#00FF7F] hover:bg-[#3bff9c] cursor-pointer">
          CONTACT US
        </a>
      </div>
      <img
        src="/images/arrow-down.svg"
        alt="arrow-down"
        className="z-10 absolute left-8 bottom-10 w-6 md:w-16 md:left-20 md:bottom-16"
      />
    </div>
  );
};
