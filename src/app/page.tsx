"use client";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Chakra_Petch } from "next/font/google";
import Link from "next/link";
const milonga = Chakra_Petch({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container className="mt-24sm:mt-32 md:mt-36">
        <FadeIn className="flex max-w-3xl flex-col gap-4">
          <h1
            className={cn(
              "font-display text-5xl font-medium tracking-tight [text-wrap:balance] sm:text-7xl",
              milonga.className,
            )}
          >
            Talk to your data with vector embeddings and ai
          </h1>
          <p className={cn("mt-6 text-xl", milonga.className)}>
            This app allows you to chat with AI regarding the content of the
            data via AI and Vector Embeddings. Tech: React, NextJS, Vercel AI,
            OpenAI, Pinecone (embeddings), prisma, mongodb
          </p>
          <div>
            <Button asChild className="bg-green-500 text-black">
              {isSignedIn ? (
                <Link href="/notes">
                  Go to notes <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link href="/sign-in">
                  Login <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </main>
  );
}
