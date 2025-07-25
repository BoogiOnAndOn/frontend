import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

// 회원 목록 출력
export const getMemberList = async (searchParam, adminId) => {
  const res = await jwtAxios.get(`${prefix}/member-inquiry/${adminId}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  return res;
};

// 작업자 단일 등록
export const createSingleWorker = async (
  adminId, // 로그인한 관리자의 ID
  name,
  phone,
  birth,
  email,
  vehicleCapacity,
  address,
  addressDetail,
  startDate,
  endDate
) => {
  try {
    // 서버로 POST 요청 보내기
    const res = await jwtAxios.post(`${prefix}/create/worker/${adminId}`, {
      name: name,
      phone: phone,
      birth: birth,
      email: email,
      vehicleCapacity: vehicleCapacity,
      address: address,
      addressDetail: addressDetail,
      startDate: startDate,
      endDate: endDate,
    });

    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error(`---/create/worker/${adminId} API 호출 오류:`, error);
    throw error; // 오류 처리
  }
};

export const getWorkAreas = async (superId) => {
  try {
    const res = await jwtAxios.get(`${prefix}/create/admin/${superId}`);
    return res;
  } catch (error) {
    console.error("시군구 가져오는 중 에러 발생: ", error);
    throw error;
  }
};

export const createSingleAdmin = async (superId, data) => {
  if (!data) {
    return;
  }
  try {
    const res = jwtAxios.post(`${prefix}/create/admin/${superId}`, data);
  } catch (error) {
    console.error("관리자 생성 중 에러 발생: ", error);
    throw error;
  }
};

// 작업자, 관리자 일괄 등록
// formData.append("exel", 엑셀파일);
// createBulkMember(formData, 관리자(슈퍼관리자)id, ("worker" / "admin"))
// 매개변수 3개 입력해서 실행
//(formData, 관리자(슈퍼관리자)id, ("worker" / "admin"))
export const createBulkMember = async (formData, id, target) => {
  const res = await jwtAxios.post(
    `${prefix}/create/${target}/bulk/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

// 멤버 삭제
export const deleteMembers = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    console.error("ids 값이 올바르지 않거나 배열이 비어 있습니다.", ids);
    return; // ids 배열이 없거나 비어 있으면 API 호출 중단
  }

  try {
    const res = await jwtAxios({
      method: "delete",
      url: `${prefix}/delete/bulk`,
      data: { ids: ids }, // 삭제할 회원의 ID 목록을 전송
    });
    return res;
  } catch (error) {
    // 오류 발생 시 출력
    console.error("삭제 API 호출 중 오류 발생:", error);
    throw error; // 오류를 다시 던져 호출한 곳에서 처리 가능하게 함
  }
};
