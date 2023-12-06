import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import { zodResolver } from "@hookform/resolvers/zod";
import { Note } from "@prisma/client";
import { Loader2, PlusIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
};

export default function AddEditNoteDialog({
  open,
  setOpen,
  noteToEdit,
}: Props) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(input: CreateNoteSchema) {
    try {
      if (noteToEdit) {
        const response = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input,
          }),
        });
        if (!response.ok) throw Error("status code: " + response.status);
      } else {
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input),
        });
        if (!response.ok) throw Error("status code: " + response.status);
        form.reset();
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      // toast({
      //   title: "Error creating note",
      // });
    }
  }

  async function deleteNote() {
    if (!noteToEdit) return;
    setDeleteLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit.id,
        }),
      });
      if (!response.ok) throw Error("Status code: " + response.status);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      // toast({
      //   title: "Error deleting note",
      // });
    } finally {
      setDeleteLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center italic">
            {noteToEdit ? "Edit" : "Add"} Note
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Interesting title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Interesting title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {noteToEdit && (
                <Button
                  disabled={deleteLoading}
                  type="button"
                  className="w-full"
                  variant="destructive"
                  onClick={() => deleteNote()}
                >
                  {deleteLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <TrashIcon className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              )}
              <Button disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {noteToEdit ? (
                      <SaveIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <PlusIcon className="mr-2 h-4 w-4" />
                    )}
                  </>
                )}
                {noteToEdit ? "Save" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
