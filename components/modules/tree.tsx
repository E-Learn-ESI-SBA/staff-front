"use client"
import {ChapterComponent} from "@/components/teacher/courses/resources/chapter";
import { Module} from "@/types/chapter/courses";
import {EditModal} from "@/types/forms/state";
import {ModalDialog} from "@/components/common/dialog/modal";
import {ChapterForm} from "@/components/forms/chapter";
import {Button} from "@/components/ui/button";
import {SectionForm} from "@/components/forms/section";
import {useModuleTreeStore} from "@/store/module/store";
import VideoForm from "@/components/forms/video";
import {FileForm} from "@/components/forms/file";

type Props = {
    modulesData:Module
    path:string
}
export function ModuleTree({modulesData,path}:Props) {
    const {setFormState,formState,buttonLoading,selectedChapter,selectedFile,selectedLesson,selectedVideo,selectedSection,currentModule,selectedIndex,updateModule,setModule,setButtonLoading} = useModuleTreeStore(state => ({
        setModule: state.setModule,
        setButtonLoading: state.setButtonLoading,
        updateModule: state.updateModule,
        formState: state.formState,
        setFormState: state.setFormState,
        currentModule: state.currentModule,
        selectedIndex: state.selectedIndex,
        buttonLoading: state.buttonLoading,
        selectedChapter: state.selectedChapter,
        selectedSection: state.selectedSection,
        selectedLesson: state.selectedLesson,
        selectedFile: state.selectedFile,
        selectedVideo: state.selectedVideo,

    }))
    setModule(modulesData)
   return ( <div className="w-full h-full flex flex-col gap-6 bg-white rounded-lg p-4">
        {currentModule.courses.map((c, i) => (
            <ChapterComponent
                year={currentModule.year}
                chapter={c}
                key={i}
                pathname={path}
            />
        ))}
       <>
           <ModalDialog open={formState == EditModal.EDIT_CHAPTER} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <ChapterForm   initialValues={{id: selectedChapter.id,name: selectedChapter.name,description: selectedChapter.name}} mode="update"  >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </ChapterForm>
           </ModalDialog>
           <ModalDialog open={formState == EditModal.ADD_CHAPTER} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <ChapterForm  mode="create"   >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </ChapterForm>
           </ModalDialog>

           <br/>
           <ModalDialog open={formState == EditModal.EDIT_SECTION} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <SectionForm defaultValues={
                   {
                       id: selectedSection.id,
                       name: selectedSection.name,

                   }
               }     mode="UPDATE"  >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </SectionForm>
           </ModalDialog>
           <ModalDialog open={formState == EditModal.ADD_SECTION} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <SectionForm  mode="CREATE"   >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </SectionForm>
           </ModalDialog>
           <br/>
           <ModalDialog open={formState == EditModal.EDIT_VIDEO} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <VideoForm  year={currentModule.year} sectionId={selectedVideo.sectionId}   defaultValues={
                   {
                       id: selectedVideo.id,
                       name: selectedVideo.name,
                        section_id: selectedVideo.sectionId,
                       url: selectedVideo.url,
                       groups: selectedVideo.groups.map(g => ({label: g, value: g,disabled: false}))
                   }
               }     mode="UPDATE"  >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </VideoForm>
           </ModalDialog>
           <ModalDialog open={formState == EditModal.ADD_VIDEO} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <VideoForm year={currentModule.year} sectionId={selectedVideo.sectionId}       mode="UPDATE"  >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </VideoForm>
           </ModalDialog>
           <br/>
           <ModalDialog open={formState == EditModal.EDIT_FILE} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)}>
               <FileForm year={currentModule.year}   defaultValues={
                   {
                       id: selectedFile.id,
                       name: selectedFile.name,
                       section_id: selectedFile.sectionId,
                       groups: selectedFile.groups.map(g => ({label: g, value: g,disabled: false})),

                   }
               }     mode="UPDATE"  >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </FileForm>
           </ModalDialog>
           <ModalDialog open={formState == EditModal.ADD_FILE} onOpenChange={(v:boolean) => setFormState(EditModal.CLOSE)} >
               <FileForm year={currentModule.year} defaultValues={{section_id: selectedFile.sectionId,groups: [],name: "",id: ""}}      mode="CREATE"  >
                   <div className="flex w-full gap-4 items-center justify-end ">
                       <Button onClick={() => setFormState(EditModal.CLOSE)} className="w-fit p-4" variant="ghost">Cancel</Button>
                       <Button type="submit" className="w-fit p-4" disabled={buttonLoading} >Save</Button>
                   </div>
               </FileForm>
           </ModalDialog>
           <br />

       </>
       <Button onClick={() => setFormState(EditModal.ADD_CHAPTER)} className="w-fit self-end p-4" >Add Chapter</Button>
    </div>)
}