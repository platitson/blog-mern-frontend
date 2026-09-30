import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(5, "Add post title"),
  text: z.string().min(10, "Add post text"),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
});
