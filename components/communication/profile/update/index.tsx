"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Profile } from "@/types";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";

const defaultValues : Profile = {
    id: "1", 
    summary:
      "I am a passionate and experienced software engineer with a strong background in web development. I am skilled in a variety of programming languages and frameworks, and I have a proven track record of delivering high-quality, efficient code. I am a team player and I am always eager to learn new things.",
    image: "/assets/teacher.jpeg", 
    file: undefined,
    experiences: [
      {
        role: "Software Engineer",
        company: "Tech Company",
        start_date: "2020-01-01",
        end_date: "2023-12-31",
        description:
          "Developed and maintained web applications using React, Node.js, and Express. Designed and implemented scalable and efficient database solutions. Worked closely with cross-functional teams to deliver projects on time and within budget.",
      },
    ],
    projects: [
      {
        name: "E-commerce Website",
        start_date: "2022-05-01",
        end_date: "2022-08-31",
        description:
          "Developed a full-stack e-commerce website using React, Node.js, and MongoDB. Implemented features such as product search, shopping cart, and user authentication.",
      },
    ],
    awards: [
      {
        name: "Best Developer Award",
        event: "Tech Conference 2022",
        date: "2022-10-25",
        description: "Awarded for outstanding contribution to the development team.",
      },
    ],
    skills: [
      {
        name: "JavaScript",
        percentage: 90,
      },
      {
        name: "React",
        percentage: 85,
      },
      {
        name: "Node.js",
        percentage: 80,
      },
    ],
    other_skills: ["Git", "Linux", "Agile Methodology"],
    educations: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University Name",
        start_date: "2016-09-01",
        end_date: "2020-05-31",
        description: "lsdkklqsdnkdnqskl",
      },
    ],
  };
  

const UpdateProfile = () => {
    const { user } = useUserStore()
  const form = useForm<Profile>({
    resolver: zodResolver(profileSchemaValidator),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control: form.control,
    name: "awards",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const { fields: otherSkillFields, append: appendOtherSkill, remove: removeOtherSkill } = useFieldArray({
    control: form.control,
    name: "other_skills",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const [currentImage, setCurrentImage] = useState<string>(
    form.getValues("image") ?? "/assets/person.png"
  );

  const submitHandler = async(data: Profile) => {
    const {file,...finaldata} = data
    console.log("Submitted form", finaldata);
    try {
        const response = await fetch(`http://localhost:8080/profiles/${defaultValues.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          //@ts-ignore
          body: JSON.stringify(finaldata)
        });
  
        if (response.ok) {
          console.log("profile updated successfully",response);
          toast.success('profile updated successfully')
        } else {
          console.error("Failed to update profile");
          toast.error('semthing went wrong')
        }
      } catch (error) {
        console.error("Error", error);
        toast.error('semthing went wrong')
      }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 flex flex-col gap-4 w-full py-4"
        >
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Input placeholder="Enter summary here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative flex flex-col gap-4">
            <Image
              alt="Profile Image"
              className=""
              width={150}
              height={100}
              src={currentImage.length > 0 ? currentImage : "/assets/person.png"}
            />
            <Button variant="default" className="relative self-end">
              Upload Image
              <Input
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    form.setValue("file", file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setCurrentImage(reader.result as string);
                      form.setValue("image", reader.result as string);
                    };
                    try {
                      reader.readAsDataURL(file);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
              />
            </Button>
          </div>
          {/* Experience Fields */}
          {experienceFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`experiences.${index}.role`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experiences.${index}.company`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experiences.${index}.start_date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experiences.${index}.end_date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experiences.${index}.description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Enter description here..."
                        {...field}
                        className="border rounded-md p-2 w-full h-32 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeExperience(index)}>Remove Experience</Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendExperience({
                role: "",
                company: "",
                start_date: "",
                end_date: "",
                description: "",
              })
            }
          >
            Add Experience
          </Button>

          {/* Project Fields */}
          {projectFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.start_date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.end_date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Enter description here..."
                        {...field}
                        className="border rounded-md p-2 w-full h-32 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeProject(index)}>Remove Project</Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendProject({
                name: "",
                start_date: "",
                end_date: "",
                description: "",
              })
            }
          >
            Add Project
          </Button>


                    {/* Skill Fields */}
                    {skillFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`skills.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter skill name here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`skills.${index}.percentage`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Percentage</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeSkill(index)}>Remove Skill</Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendSkill({
                name: "",
                percentage: 0,
              })
            }
          >
            Add Percentage
          </Button>

          {/* Award Fields */}
          {awardFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`awards.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Award Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter award title here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                     <FormField
                control={form.control}
                name={`awards.${index}.event`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Award Event</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter award title here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`awards.${index}.date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`awards.${index}.description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Enter description here..."
                        {...field}
                        className="border rounded-md p-2 w-full h-32 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeAward(index)}>Remove Award</Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendAward({
                name: "",
                event : "",
                date: "",
                description: "",
              })
            }
          >
            Add Award
          </Button>

          {otherSkillFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`other_skills.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Skill</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter skill here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeOtherSkill(index)}>Remove Skill</Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendOtherSkill("")
            }
          >
            Add Skill
          </Button>

          {/* Education Fields */}
          {educationFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`educations.${index}.degree`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter degree here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`educations.${index}.institution`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter institution here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`educations.${index}.start_date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`educations.${index}.end_date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`educations.${index}.description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Enter description here..."
                        {...field}
                        className="border rounded-md p-2 w-full h-32 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeEducation(index)}>Remove Education</Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendEducation({
                degree: "",
                institution: "",
                start_date: "",
                end_date: "",
                description: "",
              })
            }
          >
            Add Education
          </Button>

          <Button type="submit">Save Profile</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProfile;
