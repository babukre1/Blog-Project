"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { ISessionUser } from "@/lib/auth";
import { trpc } from "@/trpc/client";
import { IArticle } from "@/collections/Posts";
import ArticleImageWrapper from "./ArticleImageWrapper";
import { formatDate } from "@/lib/utils";

const DashboardRecentPosts = ({ sessionUser }: ISessionUser) => {
  let articles: IArticle[] = [];
  const { data } = trpc.createPost.getArticleByUser.useQuery({
    _id: sessionUser._id,
  });
  if (data) {
    articles = data?.articles;
  }
  if (!articles) {
    return (
      <div className="flex justify-center items-center">
        <h2>You dont have posts yet</h2>
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col items-center border bg-secondary">
      {/* recent posts head and add new button */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Blogs</h2>
        <Link
          href="/dashboard/create-post"
          className={buttonVariants({
            variant: "outline",
            className: "border-black font-semibold",
          })}
        >
          + Add New
        </Link>
      </div>
      {/* recent posts wrapper */}
      <div className="flex flex-col space-y-2 w-full">
        {articles.map((article) => (
          <div className="flex my-2" key={article._id}>
            <div className=" h-16 w-1/4 relative rounded-lg">
              <Link href={`/dashboard/update-post/${article._id}`}>
                {article.image && <ArticleImageWrapper image={article.image} />}
              </Link>
            </div>
            <div className="w-[75%] h-full flex flex-col justify-between items-start pl-2">
              <h2 className="text-base font-semibold">
                {article.title && article.title}
              </h2>
              <p className="text-muted-foreground text-xs">
                <span className="pr-2">Alexander</span> |
                <span className="pl-2">{formatDate(article.updated_at)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRecentPosts;
