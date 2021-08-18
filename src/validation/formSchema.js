import * as yup from "yup";

export default yup.object().shape({
  difficulty: yup
    .string()
    .oneOf(["easy", "medium", "hard", "mixed"], "difficulty is required"),
  category: yup
    .string()
    .oneOf(["23", "22", "21", "12", "11", "9", "15", "18"], "category is required"),
  questions: yup
    .string()
    .oneOf(["5", "10", "15", "20"], "question amount is required"),
});