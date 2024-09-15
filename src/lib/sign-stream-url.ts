export function signStreamURL(iFrameUrl: string, securityKey: string) {
  const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
  const url = new URL(iFrameUrl);

  const segment = url.pathname.split("/");

  const videoId = segment[segment.length - 1];
}
