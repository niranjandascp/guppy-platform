import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "./Button";
import { uploadImagesToCloudinary } from "../../features/upload/cloudinaryUpload";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      try {
        setIsUploading(true);
        const uploadedUrls = await uploadImagesToCloudinary(acceptedFiles);
        onChange([...value, ...uploadedUrls]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`rounded-[1.5rem] border border-dashed p-6 text-center transition ${
          isDragActive
            ? "border-cyan-400 bg-cyan-400/10"
            : "border-white/15 bg-white/5"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-slate-300">
          Drag and drop product images here, or click to upload
        </p>
        <div className="mt-4">
          <Button type="button" variant="secondary">
            {isUploading ? "Uploading..." : "Choose Images"}
          </Button>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="relative rounded-2xl border border-white/10 bg-white/5 p-2">
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-rose-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}