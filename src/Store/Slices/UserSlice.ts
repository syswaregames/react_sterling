import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IUserState {
  jwt: string | undefined;
  userId: number | undefined;
  email?: string;
  programPermissions?: UserProgramPermissions[];
  loginError?: EErrors;
  registerError?: string;
  pending: boolean;
  registerSuccess?: boolean;
}

type EErrors =
  | '"email" must be a valid email'
  | "Unknown Error"
  | "connectionFail"
  | "wrongPasswordOrLogin";
const initialState: IUserState = {
  jwt: localStorage.getItem("jwt")
    ? localStorage.getItem("jwt") ?? ""
    : undefined,
  userId: localStorage.getItem("userId")
    ? parseInt(localStorage.getItem("userId")!)
    : undefined,
  pending: false,
  email: localStorage.getItem("email")!,
};

function updateAxiosHeaders(state: IUserState) {
  if (initialState.jwt) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${initialState.jwt}`;
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
      state.pending = true;
      state.loginError = undefined;
      axios.defaults.headers.common["Authorization"] = ``;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.pending = false;
      if (!action.payload.error && action.payload.accessToken) {
        state.jwt = action.payload.accessToken;
        state.userId = action.payload.id;
        state.email = action.payload.email;
        //state.programPermissions = action.payload.programPermissions;
        updateAxiosHeaders(state);
        localStorage.setItem("jwt", action.payload.accessToken);
        if (action.payload.id)
          localStorage.setItem("userId", action.payload.id.toString());
        if (action.payload.email)
          localStorage.setItem("email", action.payload.email.toString());
      } else {
        state.loginError = action.payload.error;
      }
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.pending = false;
      state.loginError = "connectionFail";
    });
    builder.addCase(getProgramPermissionsThunk.fulfilled, (state, action) => {
      state.programPermissions = action.payload;
    });
    builder.addCase(registerThunk.pending, (state, action) => {
      state.pending = true;
      axios.defaults.headers.common["Authorization"] = ``;
      state.registerError = undefined;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.pending = false;
      if (action.payload.error) {
        state.registerError = action.payload.error;
        state.registerSuccess = false;
      } else {
        state.registerSuccess = true;
      }
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.pending = false;
      state.loginError = "connectionFail";
    });
  },
});
export const { logout } = userSlice.actions;

export interface IUserLoginResponse {
  id?: number;
  email: string;
  name: string;
  accessToken: string;
  error?: EErrors;
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
  password: string;
  email: string;
  userType: 1 | 2 | 3;
}

export const loginThunk = createAsyncThunk(
  "user/login",
  async (request: ILoginRequest) => {
    try {
      var response = await axios.post<IUserLoginResponse>("/login", request);

      if (response.data.id === undefined)
        return { ...response.data, email: request.email, error: response.data.error };

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response!.status < 500) {
        return axiosError.response!.data as IUserLoginResponse;
      } else {
        throw error;
      }
    }
  }
);

export interface IRegisterRequest {
  name: string;
  password: string;
  repeatPassword?: string;
  email: string;
  userType: "Administrator";
}
export interface IRegisterResponse {
  id: number;
  mail: string;
  name: string;
  user_type: "Administrator";
  password: string;
  error?: string;
}

export const registerThunk = createAsyncThunk(
  "user/register",
  async (props: { request: IRegisterRequest; onSuccess: () => void }) => {
    try {
      const request = { ...props.request };
      delete request.repeatPassword;
      var response = await axios.post<IRegisterResponse>("/register", request);

      if (response.data.id === undefined)
        return { ...response.data, error: "Unknown Error" };

      props.onSuccess();

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response!.status < 500) {
        return axiosError.response!.data as IRegisterResponse;
      } else {
        throw error;
      }
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
