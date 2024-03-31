import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//persist config
import { persistReducer } from "redux-persist";
import { RootState } from "..";
import {
  ICreateTournamentPayload,
  ITournament,
  IUpdateTournamentPayload,
} from "../../types/tournament.type";
import TournamentApi from "@/api/tournament-api";

type TState = {
  tournaments: ITournament[] | null;
  loading: boolean;
};

const initialState: TState = {
  tournaments: null,
  loading: false,
};

const fetchTournaments = createAsyncThunk(
  "fetch/tournaments",
  async (headers: any, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await TournamentApi.getAll(headers));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const createTournament = createAsyncThunk(
  "tournament/create",
  async (
    { payload, headers }: { payload: ICreateTournamentPayload; headers: any },
    thunkApi
  ) => {
    try {
      const tournament = await TournamentApi.create(payload, headers);
      return thunkApi.fulfillWithValue(tournament);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const updateTournament = createAsyncThunk(
  "tournament/update",
  async (
    {
      payload,
      id,
      headers,
    }: { payload: IUpdateTournamentPayload; id: string; headers: any },
    thunkApi
  ) => {
    try {
      const tournament = await TournamentApi.update(payload, id, headers);
      return thunkApi.fulfillWithValue(tournament);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const deleteTournament = createAsyncThunk(
  "tournament/delete",
  async ({ id, headers }: { id: string; headers: any }, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await TournamentApi.delete(id, headers));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTournaments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTournaments.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.data.list);
      state.tournaments = action.payload.data.list ?? null;
    });
    builder.addCase(fetchTournaments.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createTournament.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTournament.fulfilled, (state, action) => {
      state.loading = false;
      console.log("data", action.payload.data.detail);
      if (state.tournaments && action.payload.data.detail) {
        state.tournaments = [...state.tournaments, action.payload.data.detail];
      }
    });
    builder.addCase(createTournament.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTournament.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTournament.fulfilled, (state, action) => {
      state.loading = false;
      state.tournaments =
        state.tournaments?.map((tournament) =>
          tournament.tnid === action.meta.arg.id
            ? (action.payload.data.detail as ITournament)
            : tournament
        ) ?? null;
    });
    builder.addCase(updateTournament.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTournament.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTournament.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action", action.meta.arg);
      state.tournaments =
        state.tournaments?.filter(
          (tournament) => tournament.tnid !== action.meta.arg.id
        ) ?? null;
    });
    builder.addCase(deleteTournament.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {
    resetTournament: (state) => {
      return initialState;
    },
  },
});

export {
  createTournament,
  fetchTournaments,
  updateTournament,
  deleteTournament,
};
// export const tokens = (state: RootState) => state.auth.user.token;
// export const imagePath = (state: RootState) => state.auth.user.path;
export const tournaments = (state: RootState) => state.tournament.tournaments;
export const loading = (state: RootState) => state.tournament.loading;
export const { resetTournament } = tournamentSlice.actions;
export default tournamentSlice.reducer;
