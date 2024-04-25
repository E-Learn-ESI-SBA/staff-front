import { StateCreator } from "zustand";

type TUser = {
  email: string;
};

type TUserStore = {
  user: TUser;
  isAuth: boolean;
  access: string;
  refresh: string;
  setUser: (user: TUser) => void;
  setAuth: (auth: boolean) => void;
  setAccess: (access: string) => void;
  setRefresh: (refresh: string) => void;
};

const userSlice: StateCreator<TUserStore> = (set, get) => ({
  user: null,
  isAuth: false,
  access: null,
  refresh: null,
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
    })),
  setAccess: (access) =>
    set((state) => ({
      ...state,
      access,
    })),
  setRefresh: (refresh) =>
    set((state) => ({
      ...state,
      refresh,
    })),
});

export { userSlice };
export type { TUserStore, TUser };
