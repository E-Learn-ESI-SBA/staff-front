import {IModuleTreeSlice,moduleTreeSlice} from "@/store/module/tree/slice";
import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {quizSlice} from "@/store/forms/quiz/slices/quiz.slice";


export const useModuleTreeStore = create<IModuleTreeSlice>()( devtools((...a) => ({
    ...moduleTreeSlice(...a),
})),)