import { AuthCredentialsValidator } from "../lib/validators/auth-credentials-validator";
import { publicProcedure, router } from "./trpc";
import User, { IUser } from "../collections/Users";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { encrypt, sendVerificationEmail } from "../lib/auth";
import { z } from "zod";
import crypto from "crypto";

export const authRouter = router({
  signUp: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const _user: IUser | null = await User.findOne({ email });
      if (_user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "email or password incorrect",
        });
      }
      // generate hashed password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const verificationToken = crypto.randomBytes(32).toString("hex");
      // create the schema.
      const user = new User({ email, hash, verificationToken });
      // save it inti DB.
      (await user.save()) as IUser;
      const { email: savedEmail } = user;

      sendVerificationEmail({ email: savedEmail, token: verificationToken });
      return { success: true, sentToEmail: savedEmail };
    }),
  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res, req } = ctx;
      // verify if the exists in the DB.
      const _user = await User.findOne({ email });
      if (!_user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "email or password incorrect",
        });

      const { _id, email: savedEmail, hash } = _user;
      const verified = await bcrypt.compare(password, hash);
      if (!verified)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "email or password incorrect",
        });
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);

      const sessionUser = { _id, savedEmail };
      // req
      const session = await encrypt({ sessionUser, expires });
      res.cookie("session", session, {
        httpOnly: true,
        expires, // Set the expiration date
      });
      return { success: true };
    }),
  signOut: publicProcedure.mutation(({ ctx }) => {
    const { res, req } = ctx;
    res.cookie("session", "", { expires: new Date(0) });
    return { success: true, message: "signed out succesfully" };
  }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const _user = (await User.findOne({
        verificationToken: token,
      })) as IUser | null;
      if (!_user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "no verification email for this email",
        });
      }
      if (_user?.verificationToken === token) {
        const updatedUser = await User.findByIdAndUpdate(
          _user._id,
          { verified: true },
          {
            new: true,
          }
        );
        if (!updatedUser)
          throw new TRPCError({
            code: "CONFLICT",
            message: "user not found",
          });
      }

      return { success: true };
    }),
});
