"use server";

import { auth } from "@clerk/nextjs/server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function uploadFile(file: File, folder: string = "khelo-bharat") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return uploadImage(file, folder);
}

export async function deleteFile(publicId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return deleteImage(publicId);
}
