"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  value: string;
  onchange: (url: string) => void;
  endpoint: keyof typeof ourFileRouter;
  page: string;
}

export default function FileUpload({
  value,
  onchange,
  endpoint,
  page,
}: FileUploadProps) {
  return (
    <div className="flex flex-col gap-2">
      {page === "Edit Course" && value && (
        <Image
          src={value}
          width={500}
          height={500}
          alt="image"
          className="w-[280px] h-[200px] object-cover rounded-1"
        />
      )}
      {page === "Edit Section" && value !== "" && (
        <p className="text-sm font-medium">{value}</p>
      )}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onchange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
        className="w-[280px] h-[200px]"
      />
    </div>
  );
}
