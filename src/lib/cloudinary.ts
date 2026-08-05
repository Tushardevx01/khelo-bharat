import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export async function uploadImage(
  file: File,
  folder: string = "khelo-bharat"
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        transformation: [
          { width: 1000, height: 1000, crop: "limit" },
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadResult);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function uploadMultipleImages(
  files: File[],
  folder: string = "khelo-bharat"
): Promise<UploadResult[]> {
  return Promise.all(files.map((file) => uploadImage(file, folder)));
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  } = {}
): string {
  const { width = 800, height = 600, quality = 80, format = "auto" } = options;
  
  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: "fill" },
      { quality: `auto:${quality}`, fetch_format: format },
    ],
  });
}

export default cloudinary;
