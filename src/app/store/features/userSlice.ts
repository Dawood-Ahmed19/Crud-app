import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  name: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.name = null;
      state.email = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
