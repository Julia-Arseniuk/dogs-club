import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../utils/api';

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const {data} = await api.get('http://localhost:5000/api/users');
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({formData, navigate}, {rejectWithValue}) => {
    try {
      // without redirect (navigate in React)
      const {data} = await api.post('http://localhost:5000/api/users/register', formData);
      return data;

      // redirect to login with navigate()
      // await api.post('http://localhost:5000/api/users/register', formData);
      // navigate('/login', {replace: true});
    } catch (err) {
      console.log('AsyncThunk err: ', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData, {rejectWithValue}) => {
    try {
      const {data} = await api.post('http://localhost:5000/api/users/login', formData);
      return data;
    } catch (err) {
      console.log('AsyncThunk err: ', err);
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
    loading: 'idle',
    user: null,
    token: '',
    isAuth: false,
    users: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
          state.loading = 'idle';
          state.user = null;
          state.users = [];
        },
        register: (state) => {
          state.users = [1,2,3];
        },
    },
    extraReducers: (builder) => {
            // get all users
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = 'succeeded';
        })
        .addCase(getAllUsers.rejected, (state) => {
            state.loading = 'failed';
        });

              // register users
        builder.addCase(registerUser.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = 'succeeded';
        })
        .addCase(registerUser.rejected, (state, action) => {
            console.log('rejected error: ', action.payload);
            state.loading = 'failed';
        });

              // login users
        builder.addCase(loginUser.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuth = true;
            state.loading = 'succeeded';
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log('rejected error: ', action.payload);
            state.loading = 'failed';
        });
    }
  });

export const { logout } = userSlice.actions;

export default userSlice.reducer;



// const formData = new FormData(formRef.current);
//     const dataJson = JSON.stringify(Object.fromEntries(formData));
    
//     // - test GET all users
//     // fetch('/api/users')
//     // .then((res) => res.json())
//     // .then((data) => console.log(data));

//     // - test POST - register user
//     fetch('http://localhost:5000/api/users/register', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: dataJson,
//     })
//     .then((res) => res.json())
//     .then((data) => console.log(data));