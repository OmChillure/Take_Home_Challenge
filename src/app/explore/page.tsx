import { headers } from "next/headers";
import Image from "next/image";
import Header from "~/components/Header/Header";
import { Button } from "~/components/ui/button";
import { getImages } from "~/server/querries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function page() {
  const artWorks = await getImages();

  console.log(artWorks);

  return (
    <>
      <Header />
      <main className="w-responsive">
        <div className="grid h-full grid-cols-2 gap-5  lg:grid-cols-3">
          {artWorks.map((art) => (
            <div
              key={art.id}
              className="relative flex h-full w-full flex-col gap-8 rounded-xl border p-5"
            >
              <Image
                src={art.url}
                key={art.id}
                width={200}
                height={200}
                alt={art.title || `Art work`}
                className="mx-auto flex-1 object-cover object-center"
              />
              <div className="flex flex-col gap-3">
                <h3> Title: {art.title} </h3>
                <p> Description: {art.description} </p>
              </div>
              <Link href="/chat">
                <Button className="flex items-center justify-center">
                  Ask Question
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
