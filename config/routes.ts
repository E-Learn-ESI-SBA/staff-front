type TRoute = {
  [key: string]: {
    path: string;
    title: string;
    desc: string;
  };
};

export const routes: TRoute = {
  video: {
    path: "/video",
    title: "Video",
    desc: "Video description",
  },
};


export const protectedRoutes: string[] = [
  "/app/chat",
  '/'
]

export const authRoutes: string[] = [
  "/auth",
]
