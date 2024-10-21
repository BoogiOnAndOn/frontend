import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

// 회원 목록 출력
export const getMemberList = async (searchParam, adminId) => {
  console.log(
    "---member-inquiry get api called with: {tabCondition: ",
    searchParam.tabCondition,
    ", name: ",
    searchParam.nameSearch,
    "}---"
  );

  const res = await jwtAxios.get(`${prefix}/member-inquiry/${adminId}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  console.log("-----------member-inquiry get api response: ", res);

  return res;
};
