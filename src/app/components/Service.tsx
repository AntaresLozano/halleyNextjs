export const Service = ({ name, description, img }: { name: string; description: string, img:string }) => {
  return (
    <div className="w-full py-10 border-t-2 border-white flex flex-col md:flex-row md:justify-between">
      <img src={img} alt="" className="md:hidden"/>
      <div className="flex flex-col md:w-1/3">
        <h2 className="text-2xl md:text-5xl pb-0.5">{name.toUpperCase()}</h2>
        <span className="text-xs md:text-lg" >{description.toUpperCase()}</span>
      </div>
      <img src={img} alt="" className="hidden md:block" />
    </div>
  );
};
