import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../api/api';

type UserCredentials = {
  firstName: string;
  email: string;
  password: string;
};

type UserInfo = {
  firstName: string;
  email: string;
  id: string;
};

type UserState = {
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  userId: string | null;
  error: AxiosError | unknown;
  success: boolean;
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { firstName, email, password }: UserCredentials,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post('auth/register', {
        firstName,
        email,
        password,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post('auth/login', {
        email,
        password,
      });
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.id);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: UserState };
      const { data } = await api.get(`user/${user.userId}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

const userToken = localStorage.getItem('userToken') || null;
const userId = localStorage.getItem('userId') || null;

const initialState: UserState = {
  loading: false,
  userInfo: null,
  userToken,
  userId,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    clearApiError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, clearApiError } = userSlice.actions;
export default userSlice.reducer;
