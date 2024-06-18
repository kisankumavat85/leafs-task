"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/auth-context";
import { signUp } from "@/firebase/auth/sign-up";
import { SignUpSchema, signUpSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const user = useContext(AuthContext);

  if (user) {
    router.push("/");
  }

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ email, password, name }: SignUpSchema) => {
    const { error, message } = await signUp({ email, password, name });

    if (error) {
      toast({
        title: "Error",
        description: message,
      });
      return;
    }
    router.push("/signin");
  };

  return (
    <main className="box w-full flex-grow flex items-center">
      <div className="grid grid-cols-1 place-items-center h-full flex-grow">
        <div className="flex flex-col gap-8 max-w-[500px] w-full">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@abc.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="">Sign up</Button>
              <div className="flex justify-end">
                <p>
                  <span>Already a user? </span>
                  <Link href="/signin" className="underline text-blue-500">
                    Login
                  </Link>
                  <span> here</span>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
