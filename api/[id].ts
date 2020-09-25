import { getAlbumUrl } from "../utils/google_api";

module.exports = async (req, res) => {
  const {
    query: { id },
    headers: { origin },
  } = req;

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const results = await getAlbumUrl(id);
  res.json(results);
};
