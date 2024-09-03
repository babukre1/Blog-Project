import { IArticle } from "@/collections/Posts";
import ArticleBody from "@/components/ArticleBody";
import ArticleImageWrapper from "@/components/ArticleImageWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import "@/components/ArticleBody.css";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: {
    articleId: string;
  };
}

async function Page({ params }: PageProps) {
  const { articleId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc/createPost.getArticleById`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId: articleId }),
    }
  );
  const data = await res.json();
  const article = data.result.data.article as IArticle;
  const { title, description, author, body, image } = article;
  return (
    <MaxWidthWrapper>
      <div className="max-w-screen-md mx-auto flex flex-col py-12">
        <h2 className="text-slate-600 font-semibold text-base">
          {formatDate(article.updated_at)}
        </h2>

        {/* Article's Topic */}
        <div className="py-4">
          <h1 className="text-5xl max-w-2xl font-semibold ">{title}</h1>
        </div>
        {/* Article's Image */}
        <div className="py-4 flex flex-col gap-6 w-full">
          <div className="w-[768px] h-[550px] relative shrink-0">
            {image && <ArticleImageWrapper image={image} />}
          </div>
          <div className="w-full">
            <p className="text-sm text-muted-foreground max-w-[500px] mx-auto italic">
              somalia since 1990 never had a government to provide essential
              needs for their citizens like Health, Education but now after 34
              years of war and poverty somalia standing out as one of the best
              countries in technology and telecommunication in east africa.
            </p>
          </div>
        </div>
        {/* Article's Body */}
        <ArticleBody body={description} />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
