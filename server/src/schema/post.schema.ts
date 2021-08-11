import * as yup from "yup";

export const createPostSchema = yup.object({
  caption: yup.string().trim(),
  imageURL: yup.string().trim(),
});
