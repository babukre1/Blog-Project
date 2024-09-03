import { PrimaryActionEmailHtml } from "../components/VerifyEmailMessage";
import { SignJWT, jwtVerify } from "jose";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
export interface ISessionUser {
  sessionUser: {
    _id: string;
    savedEmail: string;
  };
}
interface VerifyEmailProps {
  email: string;
  token: string;
}
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 minutes")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(`Error: ${error}`);
    return { user: null };
  }
}

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const session: string | undefined = cookies.get("session")?.value;

  if (!session) return { sessionUser: null };
  const user = await decrypt(session);

  const { sessionUser } = user as ISessionUser;
  console.log(sessionUser);

  return { sessionUser };
};

export const sendVerificationEmail = async ({
  email,
  token,
}: VerifyEmailProps) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: PrimaryActionEmailHtml({
        actionLabel: " Use the button below to verify your account",
        buttonText: "Verify account",
        href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
      }),
    });
    console.log("Message sent: %s", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("error: ", error);
    return { success: false };
  }
};
