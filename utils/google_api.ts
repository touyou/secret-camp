import axios from "axios";

export const getAlbum = async (id: string, width: number) => {
  const response = await axios.get(
    `https://google-photos-album-demo2.glitch.me/${id}=w${width}`
  );
  return response.data;
};

export const getSecretCampAlbum = async (width: number) =>
  getAlbum("EvreQhisHEh3fCUp8", width);
