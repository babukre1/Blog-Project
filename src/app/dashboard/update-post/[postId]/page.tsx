"use client";
import { IArticle } from "@/collections/Posts";
import CreatePostEditor from "@/components/CreatePostEditor";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadImage from "@/components/UploadImage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PostValidators } from "@/lib/validators/post-validators";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PageProps {
  params: {
    postId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { postId } = params;
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { data, isLoading } = trpc.createPost.getArticleByIdToUpdate.useQuery({
    articleId: postId,
  });
  const { mutate: updateArticle } = trpc.createPost.updateArticle.useMutation({
    onSuccess: ({ updatedArticle }) => {
      toast.success(`Article Updated succesfully.`);
      console.log(updateArticle);
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED" || err.data?.code === "FORBIDDEN") {
        toast.error("Invalid email or password.");
      }
    },
  });
  const article = data?.article;

  const form = useForm<z.infer<typeof PostValidators>>({
    resolver: zodResolver(PostValidators),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "technology",
    },
  });

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        subtitle: article.description,
        image: article.image,
        category: article.category,
      });
    }
  }, [article, form]);

  function onSubmit({
    title,
    subtitle,
    image,
    category,
  }: z.infer<typeof PostValidators>) {
    if (article?.author.id && article._id) {
      updateArticle({
        image,
        subtitle,
        title,
        _id: article.author.id,
        articleId: article._id,
        category,
      });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-sm py-24 pl-5">
      {article && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Add Title to your Article</FormDescription>
                  {submitted && form.formState.errors.title && (
                    <FormMessage>
                      {form.formState.errors.title.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImage
                      image={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Upload an Image</FormDescription>
                  {submitted && form.formState.errors.image && (
                    <FormMessage>
                      {form.formState.errors.image.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <CreatePostEditor
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Write your article here</FormDescription>
                  {submitted && form.formState.errors.subtitle && (
                    <FormMessage>
                      {form.formState.errors.subtitle.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="technology" id="technology" />
                        <Label htmlFor="option-one">Technology</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="politics" id="politics" />
                        <Label htmlFor="politics">Politics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sport" id="sport" />
                        <Label htmlFor="sport">Sport</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" onClick={() => setSubmitted(true)}>
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Page;
