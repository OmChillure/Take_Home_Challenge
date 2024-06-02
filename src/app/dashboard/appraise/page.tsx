import Image from "next/image";
import AppraiseUpload from "~/components/Upload/Appraise";
import { db } from "~/server/db";
import { art } from "~/server/db/schema";
import { getMyWorks } from "~/server/querries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"


export default async function Appraise() {

  const appraisals = await getMyWorks(false);
  
  return (
    <div className="p-14 max-lg:pb-38 space-y-12 w-[90%]">
      <h1 className="font-bold text-lg sm:text-xl lg:text-3xl">
          Works Appraised
      </h1>
      
      <div className="flex flex-col-reverse lg:flex-col gap-12">

        <AppraiseUpload />

        <Carousel className="mx-auto">
          <CarouselContent>
            {
            appraisals.map((appraise) => {
              return(
                <CarouselItem key={appraise.id}>
                  <Image className="rouned-xl w-full" src={appraise.url} width={300} height={300} alt={appraise.title || `Art work`} />
                </CarouselItem>
              )
            })
          }
          </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}