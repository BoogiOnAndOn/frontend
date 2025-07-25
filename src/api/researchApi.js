import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/research`;

export const postAdd = async (researchObj) => {
  // ("-------" + researchObj.get("json"));
  const res = await jwtAxios.post(`${prefix}/`, researchObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // ("----------res.header: ", res.headers);

  return res.data;
};

export const getNameList = async (researcherId) => {
  const res = await jwtAxios.get(`${prefix}/${researcherId}`);
  // ("==========getNameList response : ", res);
  return res.data;
};

// 이미지 받아오기
export const getImageByFileName = async (filename) => {
  "-----------research get api called by: imageName( ", filename, " )";

  const res = await jwtAxios.get(`${prefix}/view/${filename}`, {
    responseType: "blob",
  });

  // ("-----------research get api response: ", res);

  const url = URL.createObjectURL(res.data);

  "-----------file to blob: ", url;

  return url;
};
