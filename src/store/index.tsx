import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import authSlice from "./slice/auth-slice";

export const store = configureStore({
    reducer: {
        authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
