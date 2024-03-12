import { StateCreator } from 'zustand';

type TUser = {
    email: string;
};

type TUserStore = {
    user: TUser
    isAuth: boolean;
    setUser: (user: TUser) => void;
    setAuth: (auth: boolean) => void;
};

const userSlice: StateCreator<TUserStore> = (set, get) => ({
    user: null,
    isAuth: false,
    setAuth: (auth) => set((state) => ({
        ...state, isAuth: auth
    })),
    setUser: (user) => set((state) => ({
        ...state, user: {
            ...user,
        }
    })),
});

export {userSlice};
export type {
    TUserStore,
    TUser
};
