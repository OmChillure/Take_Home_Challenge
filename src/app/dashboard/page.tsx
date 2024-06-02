import React from "react";
import { getAllMyArts } from "~/server/querries";
import { UploadButton } from "~/utils/uploadthing";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { art } from "~/server/db/schema";
import Image from "next/image";

const page = async () => {
  const artWorks = await getAllMyArts();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 space-y-4 h-full w-[73%] ml-5">
            {artWorks.map((art) => (
              <div key={art.id} className="relative border rounded-xl p-5 flex flex-col gap-8 w-full h-full">
                <Image src={art.url} key={art.id} width={200} height={200} alt={art.title || `Art work`} className="flex-1 object-cover object-center mx-auto" />
                <div className="flex-center-between">
                  <h3> {art.title} </h3>
                  <p> {art.description} </p>
                </div>
              </div>
            ))}
          </div>
  );
};

export default page;
