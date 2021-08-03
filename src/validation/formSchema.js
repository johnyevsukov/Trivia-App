import * as yup from "yup";

export default yup.object().shape({
  difficulty: yup
    .string()
    .oneOf(["easy", "medium", "hard", "mixed"], "difficulty is required"),
  category: yup
    .string()
    .oneOf(["23", "22", "21", "12", "11", "9"], "category is required"),
  questions: yup
    .string()
    .oneOf(["10", "15", "20", "25", "30"], "question amount is required"),
});