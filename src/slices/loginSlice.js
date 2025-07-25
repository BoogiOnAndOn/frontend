import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";

const initState = {
  email: "",
  username: "",
  roleNames: [],
  role: "",
  isLoading: false,
  error: null,
  workPlace: "",
  department: null,
  name: "",
  id: "",
  managerId: null,
  vehicleCapacity: undefined,
  workGroup: undefined,
};

// Redux 상태 초기화
export const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.username) {
    memberInfo.username = decodeURIComponent(memberInfo.username);
  }
  return memberInfo || initState;
};

export const loginPostAsync = createAsyncThunk(
  "login/loginPost",
  async (param, { rejectWithValue }) => {
    try {
      const response = await loginPost(param);
      response;
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: loadMemberCookie(),
  reducers: {
    login: (state, action) => {
      ("login.....");
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder

      // 로그인 성공 시
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        const autoLogin = action.meta.arg.autoLogin;
        // 자동로그인 여부에 따라 유효기간 설정
        if (!payload.error) {
          const cookieDuration = autoLogin ? 7 : 0;
          setCookie("member", JSON.stringify(payload), cookieDuration);

          Object.assign(state, payload);
        }
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(loginPostAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        ("pending...");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        ("rejected...");
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
