import { v2 as cloudinary } from "cloudinary";
import { FILE_UPLOAD } from "@/constants";
import { AppError } from "./errors";
import { logger } from "./logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type UploadResult = {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
};

export async function uploadImage(
  file: File,
  folder: string = "khelo-bharat"
): Promise<UploadResult> {
  if (!FILE_UPLOAD.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new AppError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF", 400);
  }

  if (file.size > FILE_UPLOAD.MAX_SIZE) {
    throw new AppError(`File size exceeds limit of ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`, 400);
  }

  try {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: "auto",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    logger.info("Image uploaded to Cloudinary", { publicId: result.public_id });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    logger.error("Failed to upload image to Cloudinary", error as Error);
    throw new AppError("Failed to upload image", 500);
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
    logger.info("Image deleted from Cloudinary", { publicId });
  } catch (error) {
    logger.error("Failed to delete image from Cloudinary", error as Error);
    throw new AppError("Failed to delete image", 500);
  }
}

export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  } = {}
): string {
  const transformation: Record<string, unknown>[] = [];

  if (options.width || options.height) {
    transformation.push({
      width: options.width,
      height: options.height,
      crop: "fill",
    });
  }

  if (options.quality) {
    transformation.push({ quality: options.quality });
  }

  return cloudinary.url(publicId, {
    transformation,
    format: options.format || "auto",
  });
}
