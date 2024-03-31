import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//persist config
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthApi from "../../api/auth-api";
import { RootState } from "..";
import {
  IAuth,
  ILoginUserPayload,
  IOtpVerifyPayload,
  IRegisterUserPayload,
  IUpdatePasswordPayload,
  IUpdateUserPayload,
} from "@/types/auth.type";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

type TState = {
  user: IAuth;
  loading: boolean;
};

const initialState: TState = {
  user: {
    token: null,
    path: null,
    detail: null,
  },
  loading: false,
};

const login = createAsyncThunk(
  "auth/login",
  async ({payload,headers}:{payload: ILoginUserPayload,headers:any}, thunkApi) => {
    try {
      const user = await AuthApi.login(payload,headers);
      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async ({payload,headers}:{payload: IRegisterUserPayload,headers:any}, thunkApi) => {
    try {
      const user = await AuthApi.register(payload,headers);
      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const otpVerify = createAsyncThunk(
  "auth/otp-verify",
  async ({payload,headers}:{payload: IOtpVerifyPayload,headers:any}, thunkApi) => {
    try {
      const user = await AuthApi.otpVerify(payload,headers);
      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const updateUser = createAsyncThunk(
  "auth/update-user",
  async ({payload,headers}:{payload: IUpdateUserPayload,headers:any}, thunkApi) => {
    try {
      const user = await AuthApi.updateUser(payload,headers);
      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const updateUserPassword = createAsyncThunk(
  "auth/update-password",
  async ({payload,headers}:{payload: IUpdatePasswordPayload,headers:any}, thunkApi) => {
    try {
      const user = await AuthApi.updatePassword(payload,headers);
      return thunkApi.fulfillWithValue(user);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user.token = action.payload.data.bearer_token ?? null;
      state.user.detail = {
        uid: 0,
        name: "",
        image: "",
        mobile_no: action.meta.arg.payload.mobile_no,
        email: "",
        city: "",
        reg_date: "",
        status: "",
      };
      state.user.path = action.payload.data.path ?? null;
      if (action.payload.data.detail) {
        console.log("ess hi");
        state.user.detail = action.payload.data.detail;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user.token = action.payload.data.bearer_token ?? null;
      state.user.detail = {
        uid: 0,
        name: "",
        image: "",
        mobile_no: action.meta.arg.payload.mobile_no,
        email: "",
        city: "",
        reg_date: "",
        status: "",
      };
      state.user.path = action.payload.data.path ?? null;
      if (action.payload.data.detail) {
        state.user.detail = action.payload.data.detail;
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(otpVerify.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.loading = false;
      state.user.token = action.payload.data.bearer_token ?? null;
      state.user.path = action.payload.data.path ?? null;
      state.user.detail = action.payload.data.detail;
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user.detail = action.payload.data.detail;
     
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {
    logOut: (state) => {
      return initialState;
    },
  },
});

export { login, register, otpVerify,updateUser,updateUserPassword };
export const tokens = (state: RootState) => state.auth.user.token;
export const imagePath = (state: RootState) => state.auth.user.path;
export const user = (state: RootState) => state.auth.user.detail;
export const loading = (state: RootState) => state.auth.loading;
export const { logOut } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
