import {Chapter, Lecture, Module, Section, File, Video} from "@/types/chapter/courses";
import {EditModal} from "@/types/forms/state";
import {StateCreator} from "zustand";

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
    selectedChapter: Chapter;
    setSelectedChapter: (chapter: Chapter,indexes: Indexes) => void;
    selectedSection: Section ;
    setSelectedSection: (section: Section ,indexes: Indexes) => void;
    selectedLesson: Lecture ;
    setSelectedLesson: (lecture: Lecture,indexes: Indexes) => void;
    selectedFile: File ;
    setSelectedFile: (file: File , indexes: Indexes ) => void
    selectedVideo: Video ;
    setSelectedVideo: (video: Video ,indexes: Indexes) => void
    // Map should contain key "selectedCourse" , "selectedSection","selectedResource"  add this in the type of the map
    currentMap: Map<MapK,number>,


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
    selectedChapter: {} as Chapter,
    setSelectedChapter: () => {},
    selectedSection: {} as Section & {chapterId:string},
    setSelectedSection: () => {},
    selectedLesson: {} as Lecture & {sectionId:string},
    setSelectedLesson: () => {},
    selectedFile: {} as File & {sectionId:string},
    setSelectedFile: () => {},
    selectedVideo: {} as Video & {sectionId:string},
    setSelectedVideo: () => {},
    currentMap: new Map<MapK,number>().set("selectedSection",-1).set("selectedCourse",-1).set("selectedResource",-1)


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



})
export {moduleTreeSlice}
export type {IModuleTreeSlice}