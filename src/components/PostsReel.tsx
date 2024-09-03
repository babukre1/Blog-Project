"use client";
import Image from "next/image";
import { Inconsolata } from "next/font/google";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { IArticle } from "@/collections/Posts";
import { formatDate } from "@/lib/utils";
import ArticleImageWrapper from "./ArticleImageWrapper";
const inconsolata = Inconsolata({
  weight: "500",
  subsets: ["latin"],
});
const PostsReel = () => {
  let articles: IArticle[] = [];
  const { data } = trpc.createPost.getAllArticles.useQuery();
  if (data?.val) {
    articles = data?.val;
  }

  return (
    <div className="flex flex-col py-20">
      <div className="w-full border-t-2 border-primary my-6">
        <div className="w-fit bg-primary text-white text-center py-1 px-2.5">
          <h2 className={`text-lg font-semibold ${inconsolata.className} `}>
            Most Popular
          </h2>
        </div>
      </div>
      {/* posts */}
      <div className="custom-grid mt-2 w-full">
        {articles.map((article?: IArticle) => (
          <div className="flex flex-col items-start" key={article?._id}>
            {/* image */}
            <Link href={`/articles/${article?._id}`}>
              <div className="relative w-[300px] h-[300px] shrink-0 ">
                {article?.image && (
                  <ArticleImageWrapper image={article?.image} />
                )}
              </div>
            </Link>
            <h2 className="text-2xl mt-4 text-left text-gray-800 font-semibold">
              {article?.title}
            </h2>
            <p
              className={`text-sm text-muted-foreground capitalize ${inconsolata.className} pt-2`}
            >
              <span>Haaji Warsame</span> <span>|</span>{" "}
              <span>
                {article?.updated_at && formatDate(article.updated_at)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsReel;
