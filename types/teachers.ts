import { User } from "@sentry/nextjs";

export interface Teacher {
    id?:string;
    user: User | Partial<User>;
  }