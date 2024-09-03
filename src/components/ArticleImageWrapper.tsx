"use client";
import { CldImage } from "next-cloudinary";
interface ArticleImageWrapperProps {
  image: string;
}
const ArticleImageWrapper = ({ image }: ArticleImageWrapperProps) => {
  return (
    <>
      {image ? (
        <CldImage
          src={image}
          className="object-cover object-center"
          fill
          alt="an image"
        />
      ) : (
        <div className="w-full h-full bg-slate-400" />
      )}
    </>
  );
};

export default ArticleImageWrapper;
