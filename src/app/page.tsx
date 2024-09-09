import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <iframe
            src="https://iframe.mediadelivery.net/embed/305148/7d69b0d8-24b0-4ef0-92c1-1f3c07a73267?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              border: 0,
              width: "100%",
              height: "100%",
            }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen={true}></iframe>
        </div>
      </main>
    </div>
  );
}
