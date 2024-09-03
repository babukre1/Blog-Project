"use client";
import { IArticle } from "@/collections/Posts";
import ArticleImageWrapper from "@/components/ArticleImageWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { formatDate } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Inconsolata } from "next/font/google";
import Head from "next/head";
import { useMemo } from "react";
const inconsolata = Inconsolata({
  weight: "600",
  subsets: ["latin"],
});
export default function Topics() {
  const { data } = trpc.createPost.getAllArticles.useQuery();
  const articles: IArticle[] = data?.val || [];

  // Group articles by category
  const articlesByCategory = useMemo(() => {
    return articles.reduce((acc, article) => {
      const category = article.category ? article.category.toLowerCase() : "";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
      return acc;
    }, {} as Record<string, IArticle[]>);
  }, [articles]);

  const categories = ["technology", "politics", "sport"];

  return (
    <MaxWidthWrapper>
      <div>
        <main className="flex flex-col items-center justify-center min-h-screen py-10">
          <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden p-6 sm:p-10 lg:p-16">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Topics
            </h1>
            {categories.map((category) => (
              <div key={category} className="mb-10">
                <h2
                  className={`text-3xl ${inconsolata.className} font-semibold text-gray-800 mb-4 capitalize`}
                >
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articlesByCategory[category]?.map((article) => (
                    <div
                      key={article._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="w-full h-48 relative">
                        {article.image && (
                          <ArticleImageWrapper image={article.image} />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {article.title}
                        </h3>
                        <p
                          className={`text-sm text-muted-foreground capitalize ${inconsolata.className} pt-2`}
                        >
                          <span>Haaji Warsame</span> <span>|</span>{" "}
                          <span>
                            {article?.updated_at &&
                              formatDate(article.updated_at)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </MaxWidthWrapper>
  );
}
