import {
  Module,
  ResourceEnum,
} from "@/types/chapter/courses";
import { EditModal } from "@/types/forms/state";
import { StateCreator } from "zustand";
import {
  TChapterSchema,
  TFileFormSchema,
  TLectureSchema,
  TSectionFormSchema,
  TVideoSchema,
} from "@/types/chapter/zod";

type MapK = "selectedCourse" | "selectedSection" | "selectedResource";
type Indexes = {
  selectedCourse: number;
  selectedSection?: number;
  selectedResource?: number;
};
interface IModuleTreeSlice {
  name: string;
  currentModule: Module | null;
  buttonLoading: boolean;
  setModule: (module: Module) => void;
  setButtonLoading: (loading: boolean) => void;
  formState: EditModal;
  setFormState: (state: EditModal) => void;
  onSubmit: (cb: (prev: Module) => Module) => void;
  selectedChapter: TChapterSchema;
  setSelectedChapter: (chapter: TChapterSchema, indexes: Indexes) => void;
  selectedSection: TSectionFormSchema;
  setSelectedSection: (section: TSectionFormSchema, indexes: Indexes) => void;
  selectedLesson: TLectureSchema;
  selectedFile: TFileFormSchema;
  selectedVideo: TVideoSchema;
  // Map should contain key "selectedCourse" , "selectedSection","selectedResource"  add this in the type of the map
  currentMap: Map<MapK, number>;
  onError: () => void;
  setSelectedResource<T>(
    resourceType: ResourceEnum,
    resource: T,
    indexes: Indexes,
  ): void;
}

const initialState: IModuleTreeSlice = {
  name: "",
  currentModule: null,
  buttonLoading: false,
  setModule: () => {},
  setButtonLoading: () => {},
  formState: EditModal.CLOSE,
  setFormState: () => {},
  onSubmit: () => {},
  selectedChapter: {} as TChapterSchema,
  setSelectedChapter: () => {},
  selectedSection: {} as TSectionFormSchema,
  setSelectedSection: () => {},
  selectedLesson: {} as TLectureSchema,
  selectedFile: {} as TFileFormSchema,
  selectedVideo: {} as TVideoSchema,
  currentMap: new Map<MapK, number>()
    .set("selectedSection", -1)
    .set("selectedCourse", -1)
    .set("selectedResource", -1),
  onError: () => {},
  setSelectedResource: () => {},
};
const moduleTreeSlice: StateCreator<IModuleTreeSlice> = (set, get) => ({
  ...initialState,
  setModule: (currentModule) => set({ currentModule }),
  setButtonLoading: (buttonLoading) => set({ buttonLoading }),
  setFormState: (formState) => set({ formState }),
  onSubmit: (cb) => {
    console.log("Submitting");
    set((state) => ({
      currentModule: cb(state.currentModule!),
      buttonLoading: false,
      formState: EditModal.CLOSE,
      currentMap: new Map<MapK, number>()
        .set("selectedSection", -1)
        .set("selectedCourse", -1)
        .set("selectedResource", -1),
    }));
  },

  setSelectedSection: (selectedSection, indexes) => {
    set({
      selectedSection,
      currentMap: new Map<MapK, number>()
        .set("selectedSection", indexes.selectedSection ?? -1)
        .set("selectedCourse", indexes.selectedCourse ?? -1)
        .set("selectedResource", indexes.selectedResource ?? -1),
    });
  },
  setSelectedChapter: (selectedChapter, indexes) => {
    set({
      selectedChapter,
      currentMap: new Map<MapK, number>()
        .set("selectedSection", indexes.selectedSection ?? -1)
        .set("selectedCourse", indexes.selectedCourse)
        .set("selectedResource", indexes.selectedResource ?? -1),
    });
  },
  onError: () => {
    set({ buttonLoading: false });
  },
  setSelectedResource: function <T>(
    selectedResource: ResourceEnum,
    resourceInstance: T,
    indexes: Indexes,
  ) {
    switch (selectedResource) {
      case ResourceEnum.Video:
        const resource = resourceInstance as TVideoSchema;
        set({
          selectedVideo: resource,
          currentMap: new Map<MapK, number>()
            .set("selectedSection", indexes.selectedSection ?? -1)
            .set("selectedCourse", indexes.selectedCourse)
            .set("selectedResource", indexes.selectedResource ?? -1),
        });
        break;
      case ResourceEnum.Lecture:
        const lecture = resourceInstance as TLectureSchema;
        set({
          selectedLesson: lecture,
          currentMap: new Map<MapK, number>()
            .set("selectedSection", indexes.selectedSection ?? -1)
            .set("selectedCourse", indexes.selectedCourse)
            .set("selectedResource", indexes.selectedResource ?? -1),
        });
        break;
      case ResourceEnum.File:
        const file = resourceInstance as TFileFormSchema;
        set({
          selectedFile: file,
          currentMap: new Map<MapK, number>()
            .set("selectedSection", indexes.selectedSection ?? -1)
            .set("selectedCourse", indexes.selectedCourse)
            .set("selectedResource", indexes.selectedResource ?? -1),
        });
        break;
      default:
        break;
    }
    return;
  },
});
export { moduleTreeSlice };
export type { IModuleTreeSlice };
