// store.js
import { configureStore } from '@reduxjs/toolkit';
import plantReducer from './plantSlice';

export default configureStore({
    reducer: {
        plant: plantReducer,

    },
});
