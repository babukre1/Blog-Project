import { authRouter } from "./auth-router";
import { createPostRouter } from "./createPost-router";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { sendVerificationEmail } from "../lib/auth";

export const appRouter = router({
  auth: authRouter,
  createPost: createPostRouter,
  verify: publicProcedure
    .input(z.object({ email: z.string(), token: z.string() }))
    .mutation(({ input }) => {
      const { email, token } = input;
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
