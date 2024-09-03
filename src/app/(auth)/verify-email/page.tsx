import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { VerifyEmail } from "@/components/VerifyEmail";
import { Outfit } from "next/font/google";
import Image from "next/image";
const outfit = Outfit({
  weight: "500",
  subsets: ["latin"],
});
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const page = ({ searchParams }: PageProps) => {
  const toEmail = searchParams.to;
  const token = searchParams.token;
  return (
    <MaxWidthWrapper>
      {token && typeof token == "string" ? (
        <VerifyEmail token={token} />
      ) : (
        <div
          className={`flex flex-col items-center justify-center text-center ${outfit} pt-20 space-y-6`}
        >
          <div className="text-center h-60 w-60 relative shrink-0">
            <Image
              src="/verify-email1.jpg"
              fill
              alt="verify-email-your-email"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col max-w-sm space-y-2">
            <h2 className="font-semibold text-2xl">
              Check your email and and verify your email
            </h2>
            <p className="text-muted-foreground">
              we have sent an email to {toEmail}{" "}
            </p>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default page;
