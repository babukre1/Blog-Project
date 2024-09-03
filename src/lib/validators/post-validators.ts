import { z } from "zod";

export const PostValidators = z.object({
  title: z.string().min(2, {
    message: "Title is not long enough.",
  }),
  subtitle: z.string().min(2, {
    message: "subtitle is not long enough.",
  }),
  image: z.string(),
  category: z.enum(["technology", "politics", "sport"], {
    required_error: "Category is required",
  }),
});
