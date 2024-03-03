import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IUserState {
  jwt: string | undefined;
  userId: string | undefined;
  programPermissions?: UserProgramPermissions[];
  status:
    | "idle"
    | "pending"
    | "success"
    | "wrongPasswordOrLogin"
    | "other"
    | "connectionFail";
}

const initialState: IUserState = {
  jwt: localStorage.getItem("jwt")
    ? localStorage.getItem("jwt") ?? ""
    : undefined,
  userId: localStorage.getItem("userId")
    ? localStorage.getItem("userId") ?? ""
    : undefined,
  status: "idle",
};

function updateAxiosHeaders(state: IUserState) {
  if(initialState.jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${initialState.jwt}`;
    axios.defaults.headers.common["UserId"] = initialState.userId;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["UserId"];
  }
}

updateAxiosHeaders(initialState);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = undefined;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.status = "pending";
      axios.defaults.headers.common["Authorization"] = ``;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.status = action.payload.status as any;
      if (action.payload.status === "success" && action.payload.jwt) {
        state.jwt = action.payload.jwt;
        state.userId = action.payload.userId;
        state.programPermissions = action.payload.programPermissions;
        updateAxiosHeaders(state);
        localStorage.setItem("jwt", action.payload.jwt);
        localStorage.setItem("userId", action.payload.userId);
      }
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.status = "connectionFail";
    });
    builder.addCase(getProgramPermissionsThunk.fulfilled, (state, action) => {
      state.programPermissions = action.payload;      
    });
  },
});
export const { logout } = userSlice.actions;

export interface IUserLoginResponse {
  jwt: string;
  userId: string;
  status: string;
  programPermissions?: UserProgramPermissions[];
}

export interface UserProgramPermissions {
  entidadeCodigo: number;
  programaCodigo: string;
  sistemaCodigo: string;
  inclusao: boolean;
  exclusao: boolean;
  alteracao: boolean;
  grupo: string | null;
  usuario: string | null;
}

export interface ILoginRequest {
  login: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "user/login",
  async (request: ILoginRequest) => {
    var response = await axios.post<IUserLoginResponse>(
      "/User/authenticate",
      request
    );
    if (response.status < 500) {
      return response.data;
    } else {
      throw new Error("Status: " + response.status);
    }
  }
);

export const getProgramPermissionsThunk = createAsyncThunk(
  "user/GetUserProgramPermissions",
  async () => {
    /* o Id do usuario está implícito na header pelo axios */
    if (!axios.defaults.headers.common["UserId"]) {
      throw new Error("Lacking of UserId in axios header");
    }
    var response = await axios.get<UserProgramPermissions[]>(
      "/User/GetUserProgramPermissions"
    );
    if (response.status < 500) {
      return response.data;
    } else {
      throw new Error("Status: " + response.status);
    }
  }
);
export default userSlice.reducer;
