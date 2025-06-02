import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const getWorkerDetail = async (workerId) => {
  try {
    const res = await jwtAxios.get(
      `${prefix}/member-inquiry/worker/${workerId}`
    );

    return res.data; // 필요한 데이터만 반환 (res.data로 수정)
  } catch (error) {
    console.error(`---member-inquiry/worker/${workerId} API 호출 오류:`, error);
    throw error; // 에러를 상위 로직에서 처리하도록 던짐
  }
};

export const getAdminDetail = async (adminId) => {
  try {
    const res = await jwtAxios.get(`${prefix}/member-inquiry/admin/${adminId}`);

    return res.data; // 필요한 데이터만 반환 (res.data로 수정)
  } catch (error) {
    console.error(`---member-inquiry/admin/${adminId} API 호출 오류:`, error);
    throw error; // 에러를 상위 로직에서 처리하도록 던짐
  }
};
