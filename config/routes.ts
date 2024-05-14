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

export const protectedRoutes: RegExp[] = [
  / \/app\/communication\/* /,
  /\/app\/setting\/*/,
  /\/app\/leader-board\/*/,
];

export const authRoutes: string[] = ["/auth"];

interface IRoute {
  path: string;
  title: string;
  desc: string;
  key: string;
  children?: IRoute[];
  authRegex?: RegExp;
}

class Routes {
  private treeRoute: IRoute;
  private availableKeys: { [key: string]: string };

  constructor(treeRoute: IRoute) {
    this.treeRoute = treeRoute;
    this.availableKeys = this.getKeys();
  }

  public findRouteByKey(key: string): IRoute | undefined {
    const traverse = (node: IRoute): IRoute | undefined => {
      if (node.key === key) {
        return node;
      }
      for (const child of node.children || []) {
        const foundChild = traverse(child);
        if (foundChild) {
          return foundChild;
        }
      }
      return undefined;
    };
    return traverse(this.treeRoute);
  }

  public appendFromParent(parentKey: string, newRoute: IRoute): void {
    const parent = this.findRouteByKey(parentKey);
    if (!parent) {
      return;
    }
    parent.children = parent.children || [];
    parent.children.push(newRoute);
  }
  public getKeys(): { [key: string]: string } {
    const keys: { [key: string]: string } = {};
    const traverse = (node: IRoute) => {
      keys[node.key] = node.path;
      for (const child of node.children || []) {
        traverse(child);
      }
    };
    traverse(this.treeRoute);
    return keys;
  }
  public getPath(key: string): string {
    return this.availableKeys.hasOwnProperty(key)
      ? this.availableKeys[key]
      : "";
  }
}

const route: IRoute = {
  path: "/",
  title: "Home",
  desc: "Home description",
  key: "home",
  children: [
    {
      path: "/auth",
      title: "Auth",
      desc: "Auth description",
      key: "auth",
    },
    {
      path: "/app",
      title: "App",
      desc: "App description",
      key: "app",
      children: [
        {
          path: "/app/teacher",
          title: "Teacher",
          desc: "Teacher description",
          key: "teacher",
          children: [
            {
              path: "/app/teacher/modules",
              title: "Modules",
              desc: "Modules description",
              key: "modules",
              children: [
                {
                  path: "/app/teacher/modules",
                  title: "Module",
                  desc: "Module description",
                  key: "module",
                },
              ],
            },
            {
              path: "/quiz",
              title: "Quiz",
              desc: "Quiz description",
              key: "quiz",
              children: [
                {
                  path: "/quiz/",
                  title: "Quiz",
                  desc: "Quiz description",
                  key: "single-quiz",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const appRouter = new Routes(route);
export const routeKeys = appRouter.getKeys();
export default appRouter;
