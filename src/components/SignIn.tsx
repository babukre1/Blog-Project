"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/auth-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Toast } from "./ui/toast";
import { toast } from "sonner";
import { ZodError } from "zod";

const SignIn = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const { mutate: SignIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: ({ success }) => {
      toast.success("Signed in successfully");
      router.push("/dashboard");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      console.log(`error happening: ${err}`);
    },
  });
  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    SignIn({ email, password });
  };

  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div className="mx-auto sm:max-w-sm ">
          {/* <div><Image /></div> */}
          <div className="text-center">
            <h3 className="text-2xl">Sign In to your account</h3>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 mt-3",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account? Sign Up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 py-4">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2 py-4">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                />
              </div>
              <Button>
                {isLoading ? <span>loading...</span> : <span>Sign In</span>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SignIn;
