import { IModuleTreeSlice, moduleTreeSlice } from "@/store/module/tree/slice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useModuleTreeStore = create<IModuleTreeSlice>()(
  devtools((...a) => ({
    ...moduleTreeSlice(...a),
  }),{
      name: "moduleTree"
  }),
);
