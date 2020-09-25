import { getAlbumUrl } from "../utils/google_api";
import { NowRequest, NowResponse } from "@vercel/node";

export default async function (req: NowRequest, res: NowResponse) {
  const {
    query: { id },
    headers: { origin },
  } = req;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const results = await getAlbumUrl(id);
  res.json(results);
}
