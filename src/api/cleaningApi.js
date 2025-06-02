import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/clean`;

export const postAdd = async (cleaningObj) => {
  const res = await jwtAxios.post(`${prefix}/`, cleaningObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getNameList = async (cleanerId) => {
  const res = await jwtAxios.get(`${prefix}/${cleanerId}`);
  return res.data;
};

// 이미지 받아오기
export const getImageByFileName = async (filename) => {
  const res = await jwtAxios.get(`${prefix}/view/${filename}`, {
    responseType: "blob",
  });

  const url = URL.createObjectURL(res.data);

  return url;
};
