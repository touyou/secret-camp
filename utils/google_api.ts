import axios from "axios";

export const getAlbum = async (id: string) => {
  const response = await axios.get(`https://secret-camp.vercel.app/api/${id}`);
  return response.data;
};

export const getSecretCampAlbum = async () => getAlbum("EvreQhisHEh3fCUp8");

const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;

function extractPhotos(content) {
  const links = new Set();
  let match;
  while ((match = regex.exec(content))) {
    links.add(match[1]);
  }
  return Array.from(links);
}

export async function getAlbumUrl(id) {
  const response = await axios.get(`https://photos.app.goo.gl/${id}`);
  return extractPhotos(response.data);
}
