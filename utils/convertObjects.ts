//@ts-nocheck
export default function convertObject(obj, number) {
  if (number === 1) {
    return {
      questions: obj.questions.map((question) => {
        const correct_idxs = question.options
          .filter((option) => option.validity)
          .map((option) => option.id);

        const options = question.options.map((option) => {
          const { validity, ...rest } = option;
          return rest;
        });

        return { ...question, correct_idxs, options };
      }),
    };
  } else if (number === 2) {
    return {
      questions: obj.questions.map((question) => {
        const options = question.options.map((option) => {
          const validity = question.correct_idxs.includes(option.id);
          return { ...option, validity };
        });

        const { correct_idxs, ...rest } = question;
        return { ...rest, options };
      }),
    };
  } else {
    throw new Error("Invalid number parameter. Please provide 1 or 2.");
  }
}
