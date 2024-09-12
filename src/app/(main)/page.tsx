import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <VideoPlayer />
      </main>
    </div>
  );
}
