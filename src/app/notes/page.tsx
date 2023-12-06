import NoteComponent from "@/components/Note/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "AiVectors Notes",
};

export default async function NotesPage() {
  const { userId } = auth();
  if (!userId) throw Error("no user");

  const notes = await prisma.note.findMany({ where: { userId } });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteComponent key={note.id} note={note} />
      ))}
      {notes.length == 0 && (
        <div className="col-span-full text-center">No notes created!</div>
      )}
    </div>
  );
}
