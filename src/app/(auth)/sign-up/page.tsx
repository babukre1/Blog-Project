import { redirect, useRouter } from "next/navigation";
import SignUp from "@/components/SignUp";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/auth";

const Page = async () => {
  const nextCookies = cookies();
  const { sessionUser } = await getServerSideUser(nextCookies);
  if (sessionUser) {
    redirect("/");
  }
  return <SignUp />;
};

export default Page;
