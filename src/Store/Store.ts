import {
  configureStore,
  createAsyncThunk as createAsyncThunk_,
} from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
export const store = configureStore({
  reducer: { userReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type ThunkApi = { getState: () => RootState };
// export function createAsyncThunk<TReturn, TRequest>(
//   type: string,
//   func: (
//     request: TRequest,
//     thunkApi: { dispatch: any; getState: () => RootState }
//   ) => Promise<TReturn>
// ) {
//   const ds = createAsyncThunk_<TReturn, TRequest, { state: RootState }>(
//     type,
//     func
//   );
//   return ds;
// }

