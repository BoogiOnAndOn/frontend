import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";

// 사용자 인증 및 정보 관련 커스텀 훅
export const useAuth = () => {
  const dispatch = useDispatch();

  // Redux에서 상태 가져옴
  const memberInfo = useSelector((state) => state.login);
  // username 이 있으면 로그인 된 상태로 취급
  const isLoggedIn = !!memberInfo?.username;

  const role = memberInfo?.roleNames?.[0] || "Guest";

  const isDriver = !!memberInfo?.vehicleCapacity;

  const username = memberInfo?.username || "";

  const workCity = memberInfo?.workCity || "";

  const workPlace = memberInfo?.workPlace || "";

  const department = memberInfo?.department || "";

  const departmentInfo = workPlace + "청 " + department + "과";

  const name = memberInfo?.name || "";

  const id = memberInfo?.id || "";

  const managerId = memberInfo?.managerId || null;

  const phone = memberInfo?.phone || "";

  const nameWithPhone = name + " " + phone.slice(-4);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    memberInfo,
    role,
    username,
    isDriver,
    logout: handleLogout,
    workCity,
    workPlace,
    department,
    name,
    managerId,
    id,
    phone,
    nameWithPhone,
    departmentInfo,
  };
};
