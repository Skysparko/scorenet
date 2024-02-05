import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//persist config
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthApi from "../../api/auth-api";
import { RootState } from "..";
import { IAuth } from "@/types/auth.type";

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
    tokens: null,
  },
  loading: false,
};

//create async thunk for login
const login = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, thunkApi) => {
    try {
      const user = await AuthApi.login(data.username, data.password);
      return thunkApi.fulfillWithValue(user.tokens);
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
      state.user.tokens = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {
    clearAuth: (state) => {
      return initialState;
    },
  },
});

export { login };
export const tokens = (state: RootState) => state.authSlice.user.tokens;
export const loading = (state: RootState) => state.authSlice.loading;
export const { clearAuth } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
