import { z } from "zod";
export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Cannot be longer than 20 characters" }),
  content: z.string().optional(),
});
export type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().min(1),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
