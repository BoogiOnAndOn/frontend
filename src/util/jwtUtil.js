import axios from "axios";
import { API_SERVER_HOST } from "../api/commonApi";
import { getCookie, setCookie } from "./cookieUtil.js";

const jwtAxios = axios.create();

// 토큰 갱신 API
const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  );
  return res.data;
};

// 요청 실패 처리
const requestFail = (err) => {
  return Promise.reject(err);
};

// 요청 전 쿠키에서 accessToken을 추출하여 Authorization 헤더에 주입
const beforeReq = (config) => {
  const memberInfo = getCookie("member");
  if (!memberInfo) {
    ("Member NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }
  const { accessToken } = memberInfo;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// Axios Interceptor가 요청을 가로채 beforeReq를 실행
jwtAxios.interceptors.request.use(beforeReq, requestFail);

// 통일성 및 확장성을 위해 수행 작업이 없어도 선언
const beforeRes = async (res) => {
  return res;
};

// 응답 실패 처리
const responseFail = async (err) => {
  // 401 에러 처리
  if (err.response && err.response.status === 401) {
    const memberCookieValue = getCookie("member");

    if (memberCookieValue) {
      try {
        // RefreshToken으로 새 AccessToken 발급
        const result = await refreshJWT(
          memberCookieValue.accessToken,
          memberCookieValue.refreshToken
        );
        // 새로운 AccessToken 및 RefreshToken 쿠키에 저장
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;
        setCookie("member", JSON.stringify(memberCookieValue), 1);
        // 원래 요청 다시 시도
        const originalRequest = err.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }
  }
  // 기타 에러 처리
  return Promise.reject(err);
};

// Axios Interceptor가 응답을 가로채 responseFail을 처리
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
