import * as yup from "yup";

export const createPostSchema = yup.object({
  caption: yup.string().trim().required("Please provide the caption!"),
  imageURL: yup.string().trim().required(),
});
