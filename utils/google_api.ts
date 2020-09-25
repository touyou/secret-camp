import axios from "axios";

export const getAlbum = async (id: string) => {
  const response = await axios.get(`https://photos.app.goo.gl/${id}`);
  return response.data;
};

export const getSecretCampAlbum = async () => getAlbum("EvreQhisHEh3fCUp8");
