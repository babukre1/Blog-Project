import { PostValidators } from "../lib/validators/post-validators";
import { publicProcedure, router } from "./trpc";
import { ISessionUser, decrypt } from "../lib/auth";
import { TRPCError } from "@trpc/server";
import Article, { IArticle } from "../collections/Posts";
import { z } from "zod";

export const createPostRouter = router({
  create: publicProcedure
    .input(PostValidators)
    .mutation(async ({ input, ctx }) => {
      const { title, subtitle, image, category } = input;
      const { req } = ctx;
      // get sessionId from req.headers.
      const sessionId = req.headers.cookie
        ?.split(";")
        .find((cookie) => cookie.trim().startsWith("session="))
        ?.split("=")[1];
      // make sure session exists before you decrept it and also because typescript is forcing me todo that :) .
      if (!sessionId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "user not authenticated please login or signup",
        });
      // now decrypt the sessionId to get User info stored in it.
      const { sessionUser: user }: ISessionUser = await decrypt(sessionId);

      // now finally user is authenticated and we have his info so go ahead.
      const isArticleExists = await Article.findOne({ title });

      if (isArticleExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "this title exists make sure you have a unique title",
        });
      }
      const articleToSave = {
        title,
        author: { id: user._id, email: user.savedEmail },
        description: subtitle,
        image,
        category,
      };

      const myArticle = new Article(articleToSave);

      const savedArticle = await myArticle.save();

      return {
        message: "create article success",
        article: savedArticle,
      };
    }),
  getArticleById: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { articleId } = input;
      const { req } = ctx;
      const myArticle: IArticle | null = await Article.findById(articleId);
      if (!myArticle) {
        throw new TRPCError({ code: "NOT_FOUND", message: "not found" });
      }

      return { article: myArticle };
    }),
  getArticleByIdToUpdate: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .query(async ({ input }) => {
      const { articleId } = input;
      const myArticle: IArticle | null = await Article.findById(articleId);
      if (!myArticle) {
        throw new TRPCError({ code: "NOT_FOUND", message: "not found" });
      }

      return { article: myArticle };
    }),
  getAllArticles: publicProcedure.query(async () => {
    const allArticles: IArticle[] = await Article.find({});
    return { val: allArticles.reverse() };
  }),
  getArticleByUser: publicProcedure
    .input(z.object({ _id: z.string() }))
    .query(async ({ input }) => {
      const { _id } = input;
      const articles: IArticle[] = await Article.aggregate([
        { $match: { "author.id": _id } },
      ]);

      if (!articles) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "you dont have posts published yet",
        });
      }
      return { articles, success: true };
    }),
  updateArticle: publicProcedure
    .input(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string(),
        _id: z.string(),
        articleId: z.string(),
        category: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        title,
        subtitle: description,
        image,
        _id,
        articleId,
        category,
      } = input;
      const { req } = ctx;
      // get sessionId from req.headers.
      const sessionId = req.headers.cookie
        ?.split(";")
        .find((cookie) => cookie.trim().startsWith("session="))
        ?.split("=")[1];
      // make sure session exists before you decrept it and also because typescript is forcing me todo that :) .
      if (!sessionId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "user not authenticated please login or signup",
        });
      // now decrypt the sessionId to get User info stored in it.
      const { sessionUser: user }: ISessionUser = await decrypt(sessionId);
      if (user._id !== _id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you cant modify others posts",
        });
      }
      const updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { title, description, image, category },
        { new: true, runValidators: true }
      );

      if (!updatedArticle) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you cant modify others posts",
        });
      }
      return { success: true, updatedArticle };
    }),
});
