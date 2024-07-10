"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "./constant";
import Heading from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

export default function VideoPage() {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/video", values);
      setVideo(response.data);
      form.reset();
    } catch (error: any) {
      if (error.response.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video"
        icon={VideoIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10">
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder="Anime girl wearing a kimono"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="col-span-12 w-full lg:col-span-2"
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </Form>
      <div className="mt-4 space-y-4">
        {isLoading && <Loader />}
        {!video && !isLoading && <Empty description="No video generated." />}
        {video && (
          <video
            className="mt-4 aspect-video w-full rounded-lg border bg-black lg:mt-6"
            controls
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
}
