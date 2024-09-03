"use client";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
interface PageProps {
  token: string;
  email?: string;
}
export const VerifyEmail = ({ token }: PageProps) => {
  const { data, error, isLoading } = trpc.auth.verifyEmail.useQuery({ token });
  if (error) return <div>Error, verification not succeed</div>;
  if (isLoading) return <div>Please wait, this won&apos;t take too long</div>;
  if (data.success) {
    return (
      <div>
        <p className="text-2xl font-semibold">Email Verification Succeed</p>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "mt-4",
          })}
          href="/sign-in"
        >
          Sign In to your account &rarr;
        </Link>
      </div>
    );
  }
};
