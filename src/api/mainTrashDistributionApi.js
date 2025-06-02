import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const getSearched = async (searchParam) => {
  const res = await jwtAxios.get(`${prefix}/trash-distribution`, {
    params: searchParam,
  });

  return res;
};
