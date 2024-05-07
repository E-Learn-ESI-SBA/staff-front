type TeacherRoute = {
  [key in "modules" | "files" | "videos" | "chapters" | "lectures" | "none"]:
    | {
        path: string;
        title: string;
        desc: string;
      }
    | undefined;
} & {
  path: string;
  title: string;
  desc: string;
};
type TRoute = {
  [key: string]:
    | {
        path: string;
        title: string;
        desc: string;
      }
    | TeacherRoute;
};

export const routes: TRoute = {
  video: {
    path: "/video",
    title: "Video",
    desc: "Video description",
  },
  teacher: {
    path: "app/teacher",
    title: "Teacher",
    desc: "Teacher description",
    chapters: undefined,
    lectures: undefined,
    modules: {
      path: "/modules",
      title: "Modules",
      desc: "Modules description",
    },
    videos: undefined,
  },
};
