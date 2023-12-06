import { Bot } from "lucide-react";
import { useState } from "react";
import ChatBot from "./ChatBot";
import { Button } from "./ui/button";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={open ? "outline" : "default"}
      >
        <Bot size={20} className="mr-2" />
        Chat
      </Button>
      <ChatBot
        open={open}
        onClose={() => setOpen(false)}
        toggleOpen={() => setOpen(!open)}
      />
    </>
  );
}
