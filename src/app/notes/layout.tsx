"use client";
import AddEditNoteDialog from "@/components/AddEditNoteDialog";
import ChatButton from "@/components/ChatButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Plus } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-1">
            AiVectors
          </Link>
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <ThemeSwitch />
            <ChatButton />
            <Button onClick={() => setShowNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>
      <main className="m-auto max-w-7xl p-4">{children}</main>
      {showNoteDialog && (
        <AddEditNoteDialog open={showNoteDialog} setOpen={setShowNoteDialog} />
      )}
    </>
  );
}
