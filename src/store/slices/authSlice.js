import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    return {
      user: serializedUser ? JSON.parse(serializedUser) : null,
      loading: false,
      error: null
    };
  } catch (err) {
    return {
      user: null,
      loading: false,
      error: null
    };
  }
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await authService.signIn(username, password);
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await authService.signUp(username, password);
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      // Clear from localStorage
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUser, clearError } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer; 