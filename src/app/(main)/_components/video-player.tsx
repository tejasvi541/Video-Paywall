"use client";

import { useCheckPremium } from "@/lib/hooks/users/use-check-premium";
import Upgrade from "./upgrade";
import { useSignedUrl } from "@/lib/hooks/users/user-get-signed-url";

export const VideoPlayer = () => {
  const { data: isPremium, isPending, isError } = useCheckPremium();
  const src =
    "https://iframe.mediadelivery.net/embed/305148/7d69b0d8-24b0-4ef0-92c1-1f3c07a73267?autoplay=true&loop=false&muted=false&preload=true&responsive=true";
  const {
    data: signedUrl,
    isPending: isSignedUrlPending,
    isError: isSignedUrlError,
  } = useSignedUrl(src);

  if (isPending || isSignedUrlPending) return <div>Loading...</div>;
  if (isError || isSignedUrlError) return <div>Error</div>;

  if (!isPremium) {
    return (
      <div>
        <h1>
          <p>Upgrade to Premium to watch this video</p>
        </h1>
        <Upgrade />
      </div>
    );
  }

  return (
    <div>
      <iframe
        src={signedUrl}
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
  );
};
