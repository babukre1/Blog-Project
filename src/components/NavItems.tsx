"use client";
import { Button, buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
const link = "text-slate-900 underline-offset-4 hover:underline";

export const Signout = () => {
  const router = useRouter();

  const { data, mutate: signout } = trpc.auth.signOut.useMutation({
    onSuccess: ({ message }) => {
      console.log(message);
      router.refresh();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  console.log(data?.message);
  const handleClick = () => {
    signout();
  };
  return (
    <Button
      onClick={handleClick}
      className={buttonVariants({
        variant: "default",
      })}
    >
      <h3 className="text-lg font-semibold">Signout</h3>
    </Button>
  );
};

const NavItems = () => {
  return (
    <ul className="flex gap-5">
      <li className="font-normal text-sm">
        <Link href="/" className={link}>
          Blog
        </Link>
      </li>
      <li className="font-normal text-sm">
        <Link href="/about" className={link}>
          About Us
        </Link>
      </li>
      <li className="font-normal text-sm">
        <Link href="/contact-us" className={link}>
          Contact Us
        </Link>
      </li>
      <li className="font-normal text-sm">
        <Link href="/topics" className={link}>
          Topics
        </Link>
      </li>
    </ul>
  );
};

export default NavItems;
