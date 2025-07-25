import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const deleteMemberApi = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    console.error("ids 값이 올바르지 않거나 배열이 비어 있습니다.", ids);
    return; // ids 배열이 없거나 비어 있으면 API 호출 중단
  }

  try {
    const res = await jwtAxios({
      method: "delete",
      url: `${prefix}/delete/bulk`,
      data: { ids }, // 삭제할 회원의 ID 목록을 전송
    });
    return res;
  } catch (error) {
    // 오류 발생 시 출력
    console.error("삭제 API 호출 중 오류 발생:", error);
    throw error; // 오류를 다시 던져 호출한 곳에서 처리 가능하게 함
  }
};
