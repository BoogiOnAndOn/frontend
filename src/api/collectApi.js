import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/pick-up`;

// 내 관리자 id로 등록된 모든 집하지 리스트 받아옴
export const getSpots = async (adminId) => {
  const res = await jwtAxios.get(`${prefix}/${adminId}`);

  return res.data;
};

// 특정 집하지의 state 를 added 로 바꿈
export const updateToAdded = async (spotId) => {
  const res = await jwtAxios.patch(`${prefix}/added-route/${spotId}`);

  return res.data;
};

// 특정 집하지의 state 를 completed 로 바꿈
export const updateToCompleted = async (spotId) => {
  const res = await jwtAxios.patch(`${prefix}/completed/${spotId}`);

  return res.data;
};

// 특정 집하지의 state 를 needed 로 롤백
export const updateToNeeded = async (spotId) => {
  const res = await jwtAxios.patch(`${prefix}/cancel/${spotId}`);

  return res.data;
};

// 하나로 통합
export const updateSpots = async (spotId, func) => {
  let res;

  try {
    switch (func) {
      case "toAdded":
        res = await jwtAxios.patch(`${prefix}/added-route/${spotId}`);
        break;
      case "toCompleted":
        res = await jwtAxios.patch(`${prefix}/completed/${spotId}`);
        break;
      case "toNeeded":
        res = await jwtAxios.patch(`${prefix}/cancel/${spotId}`);
        break;
      default:
        throw new Error("Invalid function type");
    }
  } catch (error) {
    console.error("API 요청 에러 발생 : ", error);
    throw error;
  }
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
