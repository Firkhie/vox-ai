"use client";

import axios from "axios";
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactMarkdown from "react-markdown";

import { formSchema } from "./constant";
import Heading from "@/components/heading";
import { Code } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

export default function ConversationPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: MessageParam = {
        role: "user",
        content: `Rules: You are a code generator. You must answer only in markdown code snippets. Use code comments for the code explanations.
        Prompt: ${values.prompt}`,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [
        ...current,
        { role: "user", content: values.prompt },
        response.data,
      ]);
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
        title="Code Generation"
        description="Automatically generate code based on your text input"
        icon={Code}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
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
                    placeholder="Simple navbar using ReactJS"
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
        {messages.length === 0 && !isLoading && (
          <Empty description="No conversation started." />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={String(message.content)}
              className={cn(
                "flex w-full items-center gap-x-8 rounded-lg p-5 md:p-8",
                message.role === "user"
                  ? "border border-black/10 bg-white"
                  : "bg-muted",
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkdown className="text-sm">
                {String(message.content)}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
