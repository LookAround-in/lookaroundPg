import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;

export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  filename: string
): Promise<string> {
   const timestamp = Date.now();
   const randomId = crypto.randomUUID();
   const fileExtension = filename.split('.').pop();
   const uniqueFilename = `${timestamp}-${randomId}${fileExtension ? `.${fileExtension}` : ''}`;

  const uploadOptions = {
    resource_type: "image" as const,
    public_id: uniqueFilename,
    transformation: [
        { quality: "auto", fetch_format: "auto" }, // Optimize quality and format
        { width: 1920, height: 1920, crop: "limit" } // Limit max dimensions
      ],
  };
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || "");
        }
      )
      .end(fileBuffer);
  });
}
