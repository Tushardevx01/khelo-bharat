import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: File,
  folder: string = "khelo-bharat"
): Promise<{ url: string; publicId: string }> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const dataURI = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder,
    resource_type: "auto",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
