import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//persist config
import { persistReducer } from "redux-persist";
import { RootState } from "..";
import {
  ICreateTeamPayload,
  ITeam,
  IUpdateTeamPayload,
} from "../../types/team.type";
import TeamApi from "@/api/team-api";

type TState = {
  teams: ITeam[] | null;
  loading: boolean;
};

const initialState: TState = {
  teams: null,
  loading: false,
};

const fetchTeams = createAsyncThunk(
  "fetch/teams",
  async (headers: any, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await TeamApi.getAll(headers));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const createTeam = createAsyncThunk(
  "team/create",
  async (
    { payload, headers }: { payload: ICreateTeamPayload; headers: any },
    thunkApi
  ) => {
    try {
      const team = await TeamApi.create(payload, headers);
      return thunkApi.fulfillWithValue(team);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const updateTeam = createAsyncThunk(
  "team/update",
  async (
    {
      payload,
      id,
      headers,
    }: { payload: IUpdateTeamPayload; id: string; headers: any },
    thunkApi
  ) => {
    try {
      const team = await TeamApi.update(payload, id, headers);
      return thunkApi.fulfillWithValue(team);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const deleteTeam = createAsyncThunk(
  "team/delete",
  async ({ id, headers }: { id: string; headers: any }, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await TeamApi.delete(id, headers));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.data.list);
      state.teams = action.payload.data.list ?? null;
    });
    builder.addCase(fetchTeams.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createTeam.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.loading = false;
      console.log("data", action.payload.data.detail);
      if (state.teams && action.payload.data.detail) {
        state.teams = [...state.teams, action.payload.data.detail];
      }
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTeam.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.teams =
        state.teams?.map((team) =>
          team.tmid === action.meta.arg.id
            ? (action.payload.data.detail as ITeam)
            : team
        ) ?? null;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTeam.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action", action.meta.arg);
      state.teams =
        state.teams?.filter((team) => team.tmid !== action.meta.arg.id) ?? null;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {
    resetTeam: (state) => {
      return initialState;
    },
  },
});

export { createTeam, fetchTeams, updateTeam, deleteTeam };
// export const tokens = (state: RootState) => state.auth.user.token;
// export const imagePath = (state: RootState) => state.auth.user.path;
export const teams = (state: RootState) => state.team.teams;
export const loading = (state: RootState) => state.team.loading;
export const { resetTeam } = teamSlice.actions;
export default teamSlice.reducer;
