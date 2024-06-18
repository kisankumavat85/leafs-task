import z, { string } from "zod";

export const signUpSchema = z
  .object({
    name: string().min(2),
    email: string().email("Email is required"),
    password: string().min(8).max(16),
    confirmPassword: string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: string().email("Email is required"),
  password: string().min(8).max(16),
});

export type SignInSchema = z.infer<typeof signInSchema>;
