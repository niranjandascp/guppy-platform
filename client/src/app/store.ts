import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // We will add auth and cart reducers here later
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;