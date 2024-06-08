import { User } from ".";

export interface Student {
    id?:string;
    user: User | Partial<User>;
    promo?: string;
    group?: string;
    year?: string;
    registration_number?: string;
    promo_group?: string;
  }
  
  