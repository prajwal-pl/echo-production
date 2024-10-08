"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";
import { revalidatePath } from "next/cache";

export async function createRoom(formData: {
  name: string;
  description: string;
  tags: string;
  githubRepo: string;
  thumbnail: string;
}) {
  const session = await auth();
  try {
    await prisma.room.create({
      data: {
        name: formData.name,
        description: formData.description,
        tags: formData.tags,
        githubRepo: formData.githubRepo,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
        Thumbnail: formData.thumbnail,
      },
    });
    revalidatePath("/browse-rooms");
  } catch (error) {
    console.log(error);
  }
}
