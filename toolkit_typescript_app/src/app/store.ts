// app dir - contains the store configuration
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// import our reducer from the slice
import counterReducer from '../features/counter/counterSlice';

// Use 'configureStore' function to create the store with Object options. 
// It will be directly used as the root reducer for the store
// by passing this object to the Redux combineReducers utility.
export const store = configureStore({
  reducer: {
    // Our Global Redux Store States 
    counter: counterReducer, // key/value - slice name / reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
