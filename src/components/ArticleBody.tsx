import "./ArticleBody.css";
interface PageProps {
  body?: string;
}
const ArticleBody = ({ body }: PageProps) => {
  return <div dangerouslySetInnerHTML={{ __html: body || "" }} />;
};

export default ArticleBody;
