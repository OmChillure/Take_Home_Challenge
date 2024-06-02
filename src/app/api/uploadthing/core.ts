import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { toast } from '~/components/ui/use-toast';
import { db } from '~/server/db';
import { art } from '~/server/db/schema';
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  fileUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();
      
      // GET REQUEST HEADERS 
      const selfArt = req.headers.get("selfArt") === "true" ? true : false;
      const title = req.headers.get("title");
      const description = req.headers.get("description");
      const onSale = req.headers.get("onSale") === "true" ? true : false;

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, data: {
        selfArt,
        title,
        description,
        onSale,
      } };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // create art work and store in db
      await db.insert(art).values({
        userId: metadata.userId,
        title: metadata.data.title ?? file.name,
        description: metadata.data.description,
        selfArt: metadata.data.selfArt,
        url: file.url,
        onSale: metadata.data.onSale,
      })


      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;