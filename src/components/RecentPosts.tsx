"use client";
import { IArticle } from "@/collections/Posts";
import ArticleImageWrapper from "./ArticleImageWrapper";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Inconsolata } from "next/font/google";
import { trpc } from "@/trpc/client";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
const inconsolata = Inconsolata({
  weight: "500",
  subsets: ["latin"],
});
const RecentPosts = () => {
  let articles: IArticle[] = [];
  const { data } = trpc.createPost.getAllArticles.useQuery();
  if (data?.val) {
    articles = data?.val;
  }
  return (
    <div className="flex flex-col my-14">
      {/* Seperator */}
      <div className="w-full border-t-2 border-primary my-6">
        <div className="w-fit bg-primary text-white text-center py-1 px-2.5">
          <h2 className={`text-lg font-semibold ${inconsolata.className}`}>
            Recent
          </h2>
        </div>
      </div>
      <div className="flex flex-col w-[750px]">
        {articles &&
          articles.map((article) => (
            <div className="grid grid-cols-2 gap-3 py-5" key={article._id}>
              {/* Image Wrapper */}
              <Link href={`/articles/${article._id}`}>
                <div className="w-[350px] h-[150px]  mr-2 relative">
                  {article.image && (
                    <ArticleImageWrapper image={article.image} />
                  )}
                </div>
              </Link>
              <div className="flex flex-col justify-start gap-2">
                <p className="text-xs text-gray-900">
                  {formatDate(article.updated_at)}
                </p>
                <h2 className="text-2xl font-semibold">{article.title}</h2>
                {/* Author Name */}
                <p
                  className={`text-base text-muted-foreground ${inconsolata.className}`}
                >
                  Abubakr ali
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentPosts;
