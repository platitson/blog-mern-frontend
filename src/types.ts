import type { z, ZodType } from "zod";
import type { PostSchema } from "./schema/post";

export type CreateFromSchema<TType extends ZodType> = z.infer<TType>;

export type PostSchemaType = CreateFromSchema<typeof PostSchema>;
export type PostType = PostSchemaType & {
  author: {
    id: string;
    fullName: string;
  };
  viewsCount: number;
  createdAt: string;
};
