"use client";
import React from "react";
import { PinContainer } from "~/components/ui/3d-pin";
import Header from "~/components/Header/Header";

export default function page() {
  return (
    <>
    <Header />
    <div className="flex justify-center items-center text-5xl">
      The Craftsmen
    </div>
    <div className="h-[35rem] w-full flex items-center justify-center ">
      <PinContainer
        title="/ui.aceternity.com"
        href="i"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Om Chillure
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Tech Stack: Next.js, Python, GenAI, ML
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
    </>
  );
}
