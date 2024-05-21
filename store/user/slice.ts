import { StateCreator } from "zustand";
import {TPayload} from "@/types";



type TUserStore = {
  user: TPayload | null
  isAuth: boolean;
  setUser: (user: TPayload) => void;
  setAuth: (auth: boolean) => void;
};

const userSlice: StateCreator<TUserStore> = (set, get) => ({
  user: null,
  isAuth: false,
  setAuth: (auth) =>
    set((state) => ({
      ...state,
      isAuth: auth,
    })),
  setUser: (user) =>
    set((state) => ({
      ...state,
      user: {
        ...user,
      },
        isAuth:true
    })),

});

export { userSlice };
export type { TUserStore };
