import {Chapter, Lecture, Module, Section, File, Video, ResourceEnum} from "@/types/chapter/courses";
import {EditModal} from "@/types/forms/state";
import {StateCreator} from "zustand";
import {TChapterSchema, TFileFormSchema, TLectureSchema, TSectionFormSchema, TVideoSchema} from "@/types/chapter/zod";
import firebase from "firebase/compat";
import functions = firebase.functions;

type MapK =  "selectedCourse" | "selectedSection" | "selectedResource"
type Indexes  = {
    selectedCourse: number;
    selectedSection?: number;
    selectedResource?: number;
}
interface IModuleTreeSlice {
    name: string;
    currentModule: Module
    buttonLoading : boolean;
    setModule: (module: Module) => void;
    setButtonLoading: (loading: boolean) => void;
    formState:EditModal
    setFormState: (state: EditModal) => void;
    onSubmit: (cb: (prev:Module) => Module) => void;
    selectedChapter: TChapterSchema;
    setSelectedChapter: (chapter: TChapterSchema,indexes: Indexes) => void;
    selectedSection: TSectionFormSchema ;
    setSelectedSection: (section: TSectionFormSchema ,indexes: Indexes) => void;
    selectedLesson: TLectureSchema ;
    setSelectedLesson: (lecture: TLectureSchema,indexes: Indexes) => void;
    selectedFile: TFileFormSchema ;
    setSelectedFile: (file: TFileFormSchema , indexes: Indexes ) => void
    selectedVideo: TVideoSchema ;
    setSelectedVideo: (video: TVideoSchema ,indexes: Indexes) => void
    // Map should contain key "selectedCourse" , "selectedSection","selectedResource"  add this in the type of the map
    currentMap: Map<MapK,number>,
    onError: () => void
    setSelectedResource<T> (resourceType: ResourceEnum, resource:T, indexes: Indexes) : void,


}

const initialState: IModuleTreeSlice = {
    name: "",
    currentModule: {} as Module,
    buttonLoading: false,
    setModule: () => {},
    setButtonLoading: () => {},
    formState: EditModal.CLOSE,
    setFormState: () => {},
    onSubmit: () => {},
    selectedChapter: {} as TChapterSchema,
    setSelectedChapter: () => {},
    selectedSection: {} as TSectionFormSchema ,
    setSelectedSection: () => {},
    selectedLesson: {} as TLectureSchema,
    setSelectedLesson: () => {},
    selectedFile: {} as TFileFormSchema ,
    setSelectedFile: () => {},
    selectedVideo: {} as TVideoSchema,
    setSelectedVideo: () => {},
    currentMap: new Map<MapK,number>().set("selectedSection",-1).set("selectedCourse",-1).set("selectedResource",-1),
    onError: ()  => {},
    setSelectedResource: () => {}


};
const moduleTreeSlice :StateCreator<IModuleTreeSlice> = (set,get) => ({
    ...initialState,
    setModule: (currentModule) => set({currentModule}),
    setButtonLoading: (buttonLoading) => set({buttonLoading}),
    setFormState: (formState) => set({formState}),
    onSubmit: (cb) => {
        set({buttonLoading: false,formState: EditModal.CLOSE}),
            set(state => ({currentModule: cb(state.currentModule)})),
            set({currentMap: new Map<MapK,number>().set("selectedSection",-1).set("selectedCourse",-1).set("selectedResource",-1)})
    },
    setSelectedVideo: (selectedVideo,indexes) => {
        set({selectedVideo,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
    },
    setSelectedFile: (selectedFile,indexes) => {
        set({selectedFile,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
    },
    setSelectedLesson: (selectedLesson,indexes) => {
        set({selectedLesson,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
    },
    setSelectedSection: (selectedSection,indexes) => {
        set({selectedSection,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
    },
    setSelectedChapter: (selectedChapter,indexes) => {
        set({selectedChapter,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
    },
    onError: () => {
        set({buttonLoading: false})
    },
    setSelectedResource : function<T> (selectedResource:ResourceEnum,resourceInstance:T,indexes:Indexes) {
            switch (selectedResource) {
                case ResourceEnum.Video:
                    const resource = resourceInstance as TVideoSchema
                    set({selectedVideo: resource,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
                    break;
                case ResourceEnum.Lecture:
                    const lecture = resourceInstance as TLectureSchema
                    set({selectedLesson: lecture,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
                    break;
                case ResourceEnum.File:
                    const file = resourceInstance as TFileFormSchema
                    set({selectedFile: file,currentMap: new Map<MapK,number>().set("selectedSection",indexes.selectedSection ?? -1).set("selectedCourse",indexes.selectedCourse).set("selectedResource",indexes.selectedResource ?? -1)})
                    break;
                default :
                    break
            }
            return

    }

})
export {moduleTreeSlice}
export type {IModuleTreeSlice}