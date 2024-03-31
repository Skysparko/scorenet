import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//persist config
import { RootState } from "..";
import {
  ICreatePlayerPayload,
  IPlayer,
  IUpdatePlayerPayload,
} from "../../types/player.type";
import PlayerApi from "@/api/player-api";

type TState = {
  players: IPlayer[] | null;
  loading: boolean;
};

const initialState: TState = {
  players: null,
  loading: false,
};

const fetchPlayers = createAsyncThunk("fetch/players", async (_, thunkApi) => {
  try {
    return thunkApi.fulfillWithValue(await PlayerApi.getAll());
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const createPlayer = createAsyncThunk(
  "player/create",
  async (payload: ICreatePlayerPayload, thunkApi) => {
    try {
      const player = await PlayerApi.create(payload);
      return thunkApi.fulfillWithValue(player);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const updatePlayer = createAsyncThunk(
  "player/update",
  async (
    { payload, id }: { payload: IUpdatePlayerPayload; id: string },
    thunkApi
  ) => {
    try {
      const player = await PlayerApi.update(payload, id);
      return thunkApi.fulfillWithValue(player);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const deletePlayer = createAsyncThunk(
  "player/delete",
  async (id: string, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await PlayerApi.delete(id));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayers.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.data.list);
      state.players = action.payload.data.list ?? null;
    });
    builder.addCase(fetchPlayers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createPlayer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createPlayer.fulfilled, (state, action) => {
      state.loading = false;
      console.log("data", action.payload.data.detail);
      if (state.players && action.payload.data.detail) {
        state.players = [...state.players, action.payload.data.detail];
      }
    });
    builder.addCase(createPlayer.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updatePlayer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePlayer.fulfilled, (state, action) => {
      state.loading = false;
      state.players =
        state.players?.map((player) =>
          player.pid === action.meta.arg.id
            ? (action.payload.data.detail as IPlayer)
            : player
        ) ?? null;
    });
    builder.addCase(updatePlayer.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deletePlayer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePlayer.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action", action.meta.arg);
      state.players =
        state.players?.filter((player) => player?.pid !== action.meta.arg) ?? null;
    });
    builder.addCase(deletePlayer.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {
    resetPlayer: (state) => {
      return initialState;
    },
  },
});

export { createPlayer, fetchPlayers, updatePlayer, deletePlayer };
// export const tokens = (state: RootState) => state.auth.user.token;
// export const imagePath = (state: RootState) => state.auth.user.path;
export const players = (state: RootState) => state.player.players;
export const loading = (state: RootState) => state.player.loading;
export const { resetPlayer } = playerSlice.actions;
export default playerSlice.reducer;
