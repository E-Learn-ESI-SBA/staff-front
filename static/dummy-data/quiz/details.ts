export const defaultValues = {
  questions: [
    {
      body: "question1",
      score: 10,
      image: "",
      file: null,
      options: [
        { option: "answer1", validity: false, id: null },
        { option: "answer2", validity: true, id: null },
        { option: "answer3", validity: false, id: null },
      ],
    },
    {
      body: "question2",
      score: 10,
      image: "",
      file: null,
      options: [
        { option: "answer1", validity: false, id: null },
        { option: "answer2", validity: true, id: null },
        { option: "answer3", validity: false, id: null },
      ],
    },
    {
      body: "question3",
      score: 10,
      image: "",
      file: null,
      options: [
        { option: "answer1", validity: false, id: null },
        { option: "answer2", validity: true, id: null },
        { option: "answer3", validity: false, id: null },
      ],
    },
  ],
};

export const defaultValues2 = {
  questions: [
    {
      body: "question1",
      score: 10,
      image: "",
      file: null,
      options: [
        {
          option: "answer1",
          id: "120",
        },
        {
          option: "answer2",
          id: "128",
        },
        {
          option: "answer3",
          id: "129",
        },
      ],
      correct_idxs: ["128", "129"],
    },
    {
      body: "question2",
      score: 10,
      image: "",
      file: null,
      options: [
        {
          option: "answer1",
          id: "5",
        },
        {
          option: "answer2",
          id: "1",
        },
        {
          option: "answer3",
          id: "9",
        },
      ],
      correct_idxs: ["5", "1"],
    },
    {
      body: "question3",
      score: 10,
      image: "",
      file: null,
      options: [
        {
          option: "answer1",
          id: "21",
        },
        {
          option: "answer2",
          id: "22",
        },
        {
          option: "answer3",
          id: "23",
        },
      ],
      correct_idxs: ["21", "23"],
    },
  ],
};
