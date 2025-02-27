import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { formApi } from './api/formApi';

const store = configureStore({
  reducer: {
    [formApi.reducerPath]: formApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(formApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
