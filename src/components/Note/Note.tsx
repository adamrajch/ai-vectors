"use client";
import { Note as NoteType } from "@prisma/client";
import { useState } from "react";
import AddEditNoteDialog from "../AddEditNoteDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
type Props = {
  note: NoteType;
};

export default function NoteComponent({ note }: Props) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const isUpdated = note.updatedAt > note.createdAt;
  const createdUpdatedAtTimeStamp = (
    isUpdated ? note.updatedAt : note.createdAt
  ).toDateString();
  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setShowEditDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimeStamp}
            {isUpdated && " (updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <AddEditNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={note}
      />
    </>
  );
}
