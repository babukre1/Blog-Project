"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/auth-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
const SignUp = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const {
    data,
    mutate: signUp,
    isLoading,
  } = trpc.auth.signUp.useMutation({
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
      router.refresh();
    },
    onError: (err) => {
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      if (err.data?.code === "UNAUTHORIZED" || err.data?.code === "CONFLICT") {
        toast.error("Invalid email or password.");
      }
      console.log(`error happening: ${err}`);
    },
  });
  const onSubmit = ({ email, password }: TAuthCredentialsValidator) =>
    signUp({ email, password });

  return (
    <MaxWidthWrapper>
      <div className="pt-20 px">
        <div className="mx-auto sm:max-w-sm ">
          {/* <div><Image /></div> */}
          <div className="text-center">
            <h3 className="text-2xl">Create New Account.</h3>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 mt-3",
              })}
              href="/sign-up"
            >
              Already have an account?
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
                  {...register("password", { required: true })}
                />
              </div>
              <Button>
                {isLoading ? <span>loading...</span> : <span>Sign Up</span>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SignUp;
