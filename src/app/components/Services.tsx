import { Button } from "./Button";

export const Services = () => {
  return (
    <div className="flex flex-col mt-15 py-6 gap-3 md:flex-row md:justify-between md:gap-6">
      <div className="md:w-1/2 md:min-w-[50%]">
        <h1 className="text-5xl relative before:absolute before:top-[-15px] before:left-[-15px] before:w-8 before:h-8 before:bg-[url('/images/star.svg')] before:bg-contain before:bg-no-repeat">
          SERVICES
        </h1>
      </div>
      <div className="flex flex-col gap-3 md:gap-6">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
          expedita tempora ducimus. Vero aspernatur tenetur doloribus a ea
          dolore tempore, natus ex dolorum, debitis temporibus ut sit distinctio
          iure facilis. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Nulla expedita tempora ducimus. Vero aspernatur tenetur
          doloribus a ea dolore tempore, natus ex dolorum, debitis temporibus ut
          sit distinctio iure facilis.
        </p>
        <Button name="DISCOVER MORE" path="/services"  />
      </div>
    </div>
  );
};
