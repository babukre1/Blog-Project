import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostsReel from "@/components/PostsReel";
import RecentPosts from "@/components/RecentPosts";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <MaxWidthWrapper>
        {/* Hero section */}
        <div className="flex flex-col items-center lg:flex-row">
          {/* Left-side Text */}

          <div className="text-center lg:text-left">
            <h1 className=" text-2xl lg:text-6xl md:text-4xl  max-w-xl font-semibold uppercase">
              Inspire Us With Your <span className="text-primary">Story</span>.
            </h1>
            <p className="text-lg mt-5 text-muted-foreground max-w-md">
              share your story to the community to inspire them to change the
              world{" "}
            </p>
            <Button size={"lg"} variant={"default"} className="mt-5">
              Explore More <span className="ml-2">&rarr;</span>
            </Button>
          </div>
          {/* Right-side Image */}
          <div className="relative w-[390px] h-[415px] sm:w-[450px] sm:h-[476px] md:w-[500px] md:h-[530px] lg:h-[390px] lg:w-[420px] xl:h-[600px] xl:w-[550px] shrink-0">
            <Image
              src="/Blog_girl_reading.gif"
              fill
              alt="Hero section Image"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        {/* Posts section */}
        <PostsReel />
        <RecentPosts />
        {/* end of posts section */}
      </MaxWidthWrapper>
      {/* CTA section */}
      {/* <RecentPosts /> */}
    </>
  );
}
