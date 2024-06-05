"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuizFormStore } from "@/store/forms/quiz/quiz.store";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '@/config/firebase';
// import { cookies } from "next/headers";


export default function Preview() {
  const {
    prevStep,
    first_step_content,
    second_step_content,
    third_step_content,
  } = useQuizFormStore((state) => ({
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    first_step_content: state.first_step_content,
    second_step_content: state.second_step_content,
    third_step_content: state.third_step_content,
  }));

  const [imageUploadError, setImageUploadError] = useState<string | boolean >();
  const [uploading, setUploading] = useState(false);
  
  const handleImageSubmit = async(questions:any,data:any) => {
    setUploading(true);
    setImageUploadError(false);
    const promises = [];
    if(data.file){
      promises.push(storeImage(data.file,-1))
    }

    for (let i = 0; i < questions.length; i++) {
      if(questions[i].file){
        promises.push(storeImage(questions[i]?.file,i));
      }

    } 
  try {
    const results = await Promise.all(promises);

            results.forEach((result : any) => {
              const { downloadURL, i } = result;
              if(i != -1){
                questions[i].image = downloadURL;
              }else{
               data.image = downloadURL
              }
           
            });
            const { file, ...updatedData } = data;
            const updatedQuestions = questions.map(({ file , ...rest }:any) => rest);
            setImageUploadError(false);
            setUploading(false);
           return [updatedQuestions,updatedData]

    }catch (err) {
      setImageUploadError('Image upload failed (2 mb max per image)');
      setUploading(false);
      throw err; 
    };
  };
  
  const storeImage = async (file:any,i:any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({downloadURL,i});
          });
        }
      );
    });
  };



  const submit = async() => {

   const [questions,firstData] = await handleImageSubmit(third_step_content!.questions,first_step_content)
   firstData.start_date = new Date(firstData.start_date)
   firstData.end_date = new Date(firstData.end_date)
   const data = {
      ...firstData,
      ...second_step_content,
      questions : questions,
      module_id: "66453ff8a9a6b2a1a507b8a2",
      teacher_id: "2"
    };
   console.log('final data',data)
    try {
      const response = await fetch("http://localhost:8080/quizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk3LCJpYXQiOjE3MTU5NTkzOTcsImp0aSI6IjYxN2EwNDU3MzNiNDQxNDlhNjY5Y2ZmMjkzOGQ3ZWFlIiwiaWQiOiIyMjNlYmU5Yi1jMWMyLTQ5M2EtYTdiYS02OThhOTM1NjdkYmUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG9zdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.2UFOb8hOBkfnGpWHgkQdJcnbK6YwqbEtn9aIFA-FNBc`,
        },
        //@ts-ignore
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("Quiz submitted successfully",response);
      } else {
        console.error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiSON.stringify(submission)z:", error);
    }
  };
  return (
    <div className="p-2">
      <p className="text-2xl my-8 font-medium text-center">Preview Questions</p>
      {third_step_content!.questions.map((question, index) => (
        <div key={index} className="flex flex-col my-8 gap-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Q{index + 1}.</p>
          </div>
          <p className="font-medium text-xl">{question.body}</p>
          {question.image && (
            <Image
              src={question.image}
              alt={question.body}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full max-w-96 h-64"
            />
          )}
          <ul className="flex flex-col gap-4 text-medium">
            {question.options.map((option, i) => (
              <li
                key={i}
                //@ts-ignore
                className={`flex justify-between items-center p-2 border-b-2 border-[#EFEFEF] ${question.correct_idxs.includes(option.id) ? "" : "text-[#8A8A8A]"}`}
              >
                <p>
                  <span>{i + 1}. </span>
                  <span>{option.option}</span>
                </p>
                {
                //@ts-ignore
                question.correct_idxs.includes(option.id) && (
                  <div className="px-4 py-2 rounded-lg text-[#2E8760] bg-[#E9FFF5]">
                    Marked as Correct
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex justify-between items-center pr-4">
        <Button
          className="w-fit py-2 px-6"
          onClick={() => {
            prevStep();
          }}
        >
          Previous
        </Button>
        <Button
          className="w-fit py-2 px-6"
          type="submit"
          onClick={() => {
            submit();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
