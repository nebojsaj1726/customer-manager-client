import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import customerReducer from '../features/customers/customersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    customers: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
