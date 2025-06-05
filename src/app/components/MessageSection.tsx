import React from "react";
import { Button } from "./Button";
import Image from "next/image";

export const MessageSection = ({ messageSectionData }: { messageSectionData: string }) => {
  return (
    <div className="md:w-full md:flex md:justify-end">
      <div className="py-5 flex flex-col gap-4 md:py-28 md:w-1/3">
        <Image src="/images/circles.svg" alt="" width={106} height={106} />
        <h3 className="text-2xl">{messageSectionData}</h3>        
        <Button name="CONTACT US" path="/contact" />
      </div>
    </div>
  );
};
