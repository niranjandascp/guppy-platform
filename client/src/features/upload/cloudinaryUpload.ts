import axios from "axios";

export async function uploadImagesToCloudinary(files: File[]): Promise<string[]> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary environment variables");
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const uploads = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const { data } = await axios.post(uploadUrl, formData, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data.secure_url as string;
  });

  return Promise.all(uploads);
}