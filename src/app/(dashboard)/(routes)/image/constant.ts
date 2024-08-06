import { z } from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
  amount: z.string().min(1, {
    message: "Amount is required",
  }),
  resolution: z.string().min(1, {
    message: "Resolution is required",
  }),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
    disabled: false,
  },
  {
    value: "2",
    label: "2 Photos",
    disabled: false,
  },
  {
    value: "3",
    label: "3 Photos",
    disabled: true,
  },
  {
    value: "4",
    label: "4 Photos",
    disabled: true,
  },
  {
    value: "5",
    label: "5 Photos",
    disabled: true,
  },
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
    disabled: false,
  },
  {
    value: "512x512",
    label: "512x512",
    disabled: true,
  },
  {
    value: "1024x1024",
    label: "1024x1024",
    disabled: true,
  },
];
