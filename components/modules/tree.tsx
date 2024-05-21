"use client";
import { ChapterComponent } from "@/components/teacher/courses/resources/chapter";
import { Module } from "@/types/chapter/courses";
import { EditModal } from "@/types/forms/state";
import { ModalDialog } from "@/components/common/dialog/modal";
import { ChapterForm } from "@/components/forms/chapter";
import { Button } from "@/components/ui/button";
import { SectionForm } from "@/components/forms/section";
import { useModuleTreeStore } from "@/store/module/store";
import VideoForm from "@/components/forms/video";
import { FileForm } from "@/components/forms/file";
import { LectureForm } from "@/components/forms/lecture";
import { useEffect } from "react";
import { Icons } from "@/components/icons/icons";

type Props = {
  modulesData: Module;
  path: string;
};
export function ModuleTree({ modulesData, path }: Props) {
  const {
    setFormState,
    formState,
    buttonLoading,
    selectedChapter,
    selectedFile,
    selectedVideo,
    selectedSection,
    currentModule,
    setModule,
  } = useModuleTreeStore((state) => ({
    setModule: state.setModule,
    formState: state.formState,
    setFormState: state.setFormState,
    currentModule: state.currentModule,
    buttonLoading: state.buttonLoading,
    selectedChapter: state.selectedChapter,
    selectedSection: state.selectedSection,
    selectedFile: state.selectedFile,
    selectedVideo: state.selectedVideo,
  }));
  useEffect(() => {
    if (!currentModule) {
      setModule(modulesData);
    }
  });
  return (
    <div className="w-full h-full flex flex-col gap-6 bg-white rounded-lg p-4">
      {currentModule?.courses?.map((chapter, index) => (
        <ChapterComponent
          key={index}
          chapter={chapter}
          pathname={path}
          year={currentModule.year}
          index={index}
        />
      ))}
      <Button onClick={() => setFormState(EditModal.ADD_CHAPTER)}>
        Create Chapter
      </Button>

      <>
        <ModalDialog
          open={formState == EditModal.EDIT_CHAPTER}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <ChapterForm
            initialValues={{
              id: selectedChapter.id,
              name: selectedChapter.name,
              description: selectedChapter.name,
            }}
            mode="UPDATE"
          >
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </ChapterForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.ADD_CHAPTER}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <ChapterForm mode="CREATE">
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </ChapterForm>
        </ModalDialog>

        <ModalDialog
          open={formState == EditModal.EDIT_SECTION}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <SectionForm
            defaultValues={{
              id: selectedSection.id,
              name: selectedSection.name,
            }}
            mode="UPDATE"
          >
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </SectionForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.ADD_SECTION}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <SectionForm mode="CREATE">
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </SectionForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.EDIT_VIDEO}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <VideoForm
            year={modulesData.year}
            sectionId={selectedVideo.section_id ?? ""}
            defaultValues={{
              id: selectedVideo.id,
              name: selectedVideo.name,
              section_id: selectedVideo.section_id,
              url: selectedVideo.url,
              groups: selectedVideo.groups,
            }}
            mode="UPDATE"
          >
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </VideoForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.ADD_VIDEO}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <VideoForm
            year={modulesData.year}
            sectionId={selectedVideo.section_id ?? ""}
            mode="CREATE"
          >
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </VideoForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.EDIT_FILE}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <FileForm
            year={modulesData.year}
            defaultValues={{
              section_id: selectedFile.section_id,
              id: selectedFile.id,
              name: selectedFile.name,
              groups: selectedFile.groups,
            }}
            mode="UPDATE"
          >
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </FileForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.ADD_FILE}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <FileForm year={modulesData.year} mode="CREATE">
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </FileForm>
        </ModalDialog>
        <ModalDialog
          open={formState == EditModal.EDIT_LECTURE}
          onOpenChange={(v: boolean) => setFormState(EditModal.CLOSE)}
        >
          <LectureForm
            year={modulesData.year}
            defaultValues={{ groups: [], name: "", id: "" }}
          >
            <div className="flex w-full gap-4 items-center justify-end ">
              <Button
                onClick={() => setFormState(EditModal.CLOSE)}
                className="w-fit p-4"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-fit p-4"
                disabled={buttonLoading}
              >
                {buttonLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save
              </Button>
            </div>
          </LectureForm>
        </ModalDialog>
      </>
    </div>
  );
}
