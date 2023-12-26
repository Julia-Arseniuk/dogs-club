import {configureStore} from '@reduxjs/toolkit';

import userReducer from './userSlice';
// import {register} from './userSlice'

const store = configureStore({
    reducer: {
        userState: userReducer,
    },
});

// console.log(store.getState());
// store.dispatch(register());
// console.log(store.getState());


export default store;