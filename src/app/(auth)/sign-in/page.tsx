import SignIn from "@/components/SignIn";
import { getServerSideUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const nextCookies = cookies();
  const { sessionUser } = await getServerSideUser(nextCookies);
  if (sessionUser) {
    redirect("/");
  }
  return <SignIn />;
};

export default Page;
