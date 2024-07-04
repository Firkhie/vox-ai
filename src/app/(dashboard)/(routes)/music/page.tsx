"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "./constant";
import Heading from "@/components/heading";
import { Music } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";
import Empty from "@/components/empty";

export default function MusicPage() {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log("[SUBMIT_ERROR]", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music"
        icon={Music}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
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
                    placeholder="Anime ost piano solo"
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
        {!music && !isLoading && <Empty description="No music generated." />}
        {music && (
          <audio controls className="mt-4 lg:mt-6 w-full">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
}
