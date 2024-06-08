"use client";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {FileRejection, useDropzone} from "react-dropzone";
import {CircleX, FileUp} from "lucide-react";
import { toast } from "sonner";

const ImageUpload = (
    {files, setFiles} : {files:File[], setFiles:React.Dispatch<React.SetStateAction<File[]>>}
) => {

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles:FileRejection[]) => {

    if (acceptedFiles?.length) {
        if (files.length <= 4) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                  Object.assign(file, { preview: URL.createObjectURL(file) }),
                ),
            ]);
        } else {
            toast.error("Only 5 images are allowed", {
                style: {
                    backgroundColor: "red",
                    color: "white",
                },
            });
        }

    }

    if (rejectedFiles?.length) {
      toast.error(rejectedFiles[0].errors[0].message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    //@ts-ignore
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name:string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };



  return (
    <div>
        {/* image upload area */}
        <div
          {...getRootProps({})}
          className="border border-neutral-200"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 border-dotted border-2 border-gray-400 rounded-lg p-3 focus-visible:ring-0">
            <FileUp className="w-5 h-5 " />
            {isDragActive ? (
              <p>Drop the images here ...</p>
            ) : (
              <p>Drag & drop images here, or click to select files</p>
            )}
          </div>
        </div>
        {/* images list */}
        <ul className="mt-6 gap-4 flex flex-row flex-wrap h-14">
        {files.map((file) => (
          <li
            key={file.name}
            className="relative flex gap-4 p-2 rounded-md shadow-lg flex-row justify-center items-center bg-gray-300"
          >
            <p className="mt-2 text-neutral-500 text-[12px] font-medium">
              {file.name}
            </p>
            <button
              type="button"
              className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
              onClick={() => removeFile(file.name)}
            >
              <CircleX className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUpload;
