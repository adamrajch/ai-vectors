import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Message } from "ai";
import { useChat } from "ai/react";
import { Bot, Trash, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
type Props = {
  open: boolean;
  onClose: () => void;
  toggleOpen: () => void;
};

function ChatBot({ open, onClose, toggleOpen }: Props) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";
  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-12",
      )}
    >
      <div className="flex flex-col rounded border bg-background shadow-xl">
        <div className="bg-primary-foreground">
          <div
            className="flex cursor-pointer items-center justify-between p-3"
            onClick={() => toggleOpen()}
          >
            <p className="font-bold">Vector Chat</p>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setMessages([])}
                  className="shrink-0"
                  title="clear chat"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}

              <button
                onClick={onClose}
                type="button"
                className="ms-auto flex items-center"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className={cn(open ? "block" : "hidden")}>
          <div className="mt-3 h-[600px] overflow-y-auto px-3 " ref={scrollRef}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && lastMessageIsUser && (
              <ChatMessage
                message={{
                  role: "assistant",
                  content: "Thinking...",
                }}
              />
            )}
            {error && (
              <ChatMessage
                message={{
                  role: "assistant",
                  content: "Something went wrong. Please try again.",
                }}
              />
            )}
            {!error && messages.length === 0 && (
              <div className="mt-3 flex h-full items-center justify-center gap-3">
                <Bot />
                Ask the AI a question about your notes
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="m-3 flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="ask me something"
              ref={inputRef}
            />
            <Button>Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  const { user } = useUser();
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "m-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </p>
      {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="User image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      )}
    </div>
  );
}
