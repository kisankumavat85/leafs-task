"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema, signInSchema } from "@/schema/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signIn from "@/firebase/auth/sign-in";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

const SignInPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const user = useContext(AuthContext);

  if (user) {
    router.push("/");
  }

  const onSubmit = async ({ email, password }: SignInSchema) => {
    const { error, message } = await signIn({ email, password });

    if (error) {
      toast({
        title: "Error",
        description: message,
      });
      return;
    }
    router.push("/");
  };

  return (
    <main className="box w-full flex-grow flex items-center">
      <div className="grid grid-cols-1 place-items-center h-full flex-grow">
        <div className="flex flex-col gap-8 max-w-[500px] w-full">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
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
              <Button className="mt-4">Log In</Button>
              <div className="flex justify-end">
                <p>
                  <span>New to TweetX? </span>
                  <Link href="/signup" className="underline text-blue-500">
                    Register
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

export default SignInPage;
