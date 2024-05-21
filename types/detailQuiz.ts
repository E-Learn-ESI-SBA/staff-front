type Answer = {
  id: number;
  text: string;
};

export type Question = {
  id: number;
  answers: Answer[];
  image?: string;
  body?: string;
  options?: {
    id: string;
    option: string;
  }[];

};

export default interface Quiz {
  questions: Question[];
}
