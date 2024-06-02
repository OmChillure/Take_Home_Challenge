import "server-only"
import { db } from "./db"
import { currentUser } from "@clerk/nextjs/server";
import { art } from "./db/schema";
import { and, desc, eq } from "drizzle-orm";


export async function getMyWorks( showArt: boolean ){
    const user = await currentUser()

    if(!user) return [];

    const artWork = await db.select().from(art).where(and(eq(art.userId, user.id), eq(art.selfPdf, showArt)))
    return artWork;
}

export async function getAllMyArts() {
    const user = await currentUser()

    if(!user) return [];
    
    const artWork = await db.select().from(art).where(eq(art.userId, user.id))
    return artWork;
}


export async function getImages() {
    const artWork = await db.select().from(art).orderBy(desc(art.createdAt));

    return artWork;
}