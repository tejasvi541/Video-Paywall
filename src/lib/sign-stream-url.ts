import crypto from "crypto";
export function signStreamURL(iFrameUrl: string, securityKey: string) {
  const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
  const url = new URL(iFrameUrl);

  const segment = url.pathname.split("/");

  const videoId = segment[3];

  const token = generateToken(videoId, expiration, securityKey);
  url.searchParams.set("token", token);
  url.searchParams.set("expires", expiration.toString());

  return url.toString();
}

function generateToken(
  videoId: string,
  expiration: number,
  securityKey: string
) {
  const payload = securityKey + videoId + expiration.toString();

  const hash = crypto.createHash("sha256");
  hash.update(payload);
  return hash.digest("hex");
}
