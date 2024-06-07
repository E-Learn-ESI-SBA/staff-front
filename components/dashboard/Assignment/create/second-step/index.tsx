//@ts-nocheck
"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircleX, FileUp } from "lucide-react";
import { useAssignmentFormStore } from "@/store/forms/assignments/question.store";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const Submission = () => {
  const router = useRouter();
  const { user } = useUserStore()
  const { prevStep, first_step_content } = useAssignmentFormStore((state) => ({
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    first_step_content: state.first_step_content,
  }));
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxSize: 1024 * 5000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files?.length) return;
    
    const formData = new FormData();
    console.log('files', files);
  
    // Append files to FormData
    files.forEach((file, index) => {
      formData.append(`file`, file);
    });
    let date = new Date(first_step_content.deadline);
    let formattedDate = date.toISOString().split('T')[0]; 
    let time = date.toTimeString().split(' ')[0];
    
    first_step_content.deadline  = `${formattedDate} ${time}`;

    Object.keys(first_step_content).forEach(key => {
      formData.append(key, first_step_content[key]);
    });
  
    console.log("Submitted form",formData);
  
    try {
      const response = await fetch(`${ASSIGNMENT_BASE_URL}/assignments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: formData
      });
  
      console.log('FormData', formData);
  
      if (response.ok) {
        toast.success("Assignment created successfully", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        setTimeout(() => {
          router.push("/app/teacher/assignment");
        }, 2000);
        console.log("Quiz submitted successfully", response);
      } else {
        toast.error("Error when creating assignment", {
          style:{
            background: "#FF0000",
            color: "#fff",
          }
        });
        console.error("Failed to submit quiz", response);
      }
    } catch (error) {
      toast.error("Error when creating assignment", {
        style:{
          background: "#FF0000",
          color: "#fff",
        }
      });
      console.error("Error submitting quiz:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({})}
        className="p-16 mt-10 border border-neutral-200"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <FileUp className="w-5 h-5 " />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <section className="mt-10">
        <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
          Accepted Files
        </h3>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
          {files.map((file) => (
            <li
              key={file.name}
              className="relative flex gap-4 bg-[#E9E9E9] p-2 rounded-md shadow-lg"
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

        <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
          Rejected Files
        </h3>
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-red-400 hover:text-white transition-colors"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="flex items-center justify-center gap-8">
          <button
            type="submit"
            className="mt-1 text-sm bg-[#0066FF] font-bold text-white rounded-md py-4 px-12  "
          >
            Confirm
          </button>
          <button
            onClick={removeAll}
            className="mt-1 text-sm bg-[#efefef] font-semibold text-[#8A8A8A] rounded-md py-4 px-12 "
          >
            Clear
          </button>
        </div>
      </section>
    </form>
  );
};

export default Submission;
