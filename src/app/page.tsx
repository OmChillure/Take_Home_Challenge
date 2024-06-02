import React from "react";
import Header from "~/components/Header/Header";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { SparklesCore } from "~/components/ui/sparkles";


export const dynamic = "force-dynamic";

export default async function HomePage() {
  
  
  return ( 
    <>
    <div className="bg-black h-[20%]">
    <Header />
    </div>
    <div className="h-[37rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Pd-fy
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        
        <div className="flex justify-center items-center h-[90%]"> 
        <Button className="flex justify-center items-center">
         <Link href="/explore">
           Explore Pdf Gallery
         </Link>
       </Button>
       </div>
      </div>
    </div>
    </>
  );
}