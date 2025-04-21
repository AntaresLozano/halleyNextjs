import { Button } from "./Button";

export const MessageSection = () => {
  return (
    <div className="md:w-full md:flex md:justify-end">
      <div className="py-5 flex flex-col gap-4 md:py-28 md:w-1/3">
        <img src="/images/circles.svg" alt="" width={106} />
        <h3 className="text-2xl">
          LET’S BOOK A MEETING AND START PLOTTING YOUR NEXT CAMPAIGN OR WORLD
          TAKEOVER
        </h3>
        <Button name="CONTACT US" path="/contact" />
      </div>
    </div>
  );
};
