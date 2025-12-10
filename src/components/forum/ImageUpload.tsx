"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: keyof OurFileRouter;
}

export default function ImageUpload({
  endpoint,
  onChange,
  value,
}: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative w-40 h-40">
        <Image
          src={value}
          alt="Upload"
          fill
          className="rounded-md object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) onChange(res[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
      className="w-full"
    />
  );
}
