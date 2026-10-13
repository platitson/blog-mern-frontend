import type { z, ZodType } from "zod";
import type { PostSchema } from "./schema/post";
import type { LoginSchema, RegistrationSchema } from "./schema/auth";

export type CreateFromSchema<TType extends ZodType> = z.infer<TType>;

// POST
export type PostSchemaType = CreateFromSchema<typeof PostSchema>;
export type PostType = PostSchemaType & {
  _id: string;
  author: {
    _id: string;
    fullName: string;
  };
  viewsCount: number;
  createdAt: string;
};

// AUTH
export type LoginSchemaType = CreateFromSchema<typeof LoginSchema>;
export type RegistrationSchemaType = CreateFromSchema<
  typeof RegistrationSchema
>;

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  token?: string;
};
