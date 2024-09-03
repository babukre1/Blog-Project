import { getServerSideUser } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import NavItems from "./NavItems";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Separator } from "./ui/separator";
import { Button, buttonVariants } from "./ui/button";

const Navbar = async () => {
  const nextCookies = cookies();
  const { sessionUser } = await getServerSideUser(nextCookies);
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <MaxWidthWrapper>
        <header className="flex items-center justify-between border-b h-16">
          <div className="">
            <h3 className="text-lg font-semibold">
              <Link href="/">Ilayska</Link>
            </h3>
          </div>
          <NavItems />
          <div className="flex">
            {sessionUser ? (
              <h3 className="text-lg font-semibold">
                {sessionUser.savedEmail}
              </h3>
            ) : (
              <>
                <Button
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "text-base font-semibold border border-black mr-4",
                  })}
                >
                  <Link href="/sign-up" className="text-black">
                    Create account
                  </Link>
                </Button>
                <Button
                  className={buttonVariants({
                    variant: "default",
                    className: "text-base font-semibold",
                  })}
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
