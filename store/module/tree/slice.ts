import {Chapter, Lecture, Module, Section, File, Video} from "@/types/chapter/courses";
import {EditModal} from "@/types/forms/state";
import {StateCreator} from "zustand";

interface IModuleTreeSlice {
    name: string;
    currentModule: Module
    buttonLoading : boolean;
    setModule: (module: Module) => void;
    setButtonLoading: (loading: boolean) => void;
    updateModule: (cb: (prev:Module) => Module) => void;
    formState:EditModal
    setFormState: (state: EditModal) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    onSubmit: () => void;
    selectedChapter: Chapter;
    setSelectedChapter: (chapter: Chapter) => void;
    selectedSection: Section & {chapterId: string};
    setSelectedSection: (section: Section & {chapterId:string}) => void;
    selectedLesson: Lecture & {sectionId: string};
    setSelectedLesson: (lecture: Lecture & {sectionId:string}) => void;
    selectedFile: File & {sectionId:string};
    setSelectedFile: (file: File & {sectionId:string}) => void
    selectedVideo: Video & {sectionId:string};
    setSelectedVideo: (video: Video & {sectionId:string}) => void

}

const initialState: IModuleTreeSlice = {
    name: "",
    currentModule: {} as Module,
    buttonLoading: false,
    setModule: () => {},
    setButtonLoading: () => {},
    updateModule: () => {},
    formState: EditModal.CLOSE,
    setFormState: () => {},
    selectedIndex: -1,
    setSelectedIndex: () => {},
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


};
const moduleTreeSlice :StateCreator<IModuleTreeSlice> = (set,get) => ({
    ...initialState,
    setModule: (currentModule) => set({currentModule}),
    setButtonLoading: (buttonLoading) => set({buttonLoading}),
    updateModule: (cb) => set(state => ({currentModule: cb(state.currentModule)})),
    setFormState: (formState) => set({formState}),
    setSelectedIndex: (selectedIndex) => set({selectedIndex}),
    onSubmit: () => {
        set({buttonLoading: false,formState: EditModal.CLOSE,selectedIndex: -1})
    }

})
export {moduleTreeSlice}
export type {IModuleTreeSlice}