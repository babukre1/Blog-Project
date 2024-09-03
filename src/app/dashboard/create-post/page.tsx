"use client";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const Page = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { mutate: publishArticle, isLoading } =
    trpc.createPost.create.useMutation({
      onSuccess: () => {
        toast.success("Post Created succcesfully");
      },
    });
  const form = useForm<z.infer<typeof PostValidators>>({
    resolver: zodResolver(PostValidators),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "technology",
    },
  });
  function onSubmit({
    title,
    subtitle,
    image,
    category,
  }: z.infer<typeof PostValidators>) {
    publishArticle({ image, subtitle, title, category });
  }

  return (
    <div className="max-w-screen-sm py-24 pl-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Add Title to your Article</FormDescription>
                {submitted && form.formState.errors && <FormMessage />}
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
                  <UploadImage image={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>Upload an Image</FormDescription>
                {submitted && form.formState.errors && <FormMessage />}
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
                {submitted && form.formState.errors && <FormMessage />}
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
            {isLoading ? "submitting..." : "Publish"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
