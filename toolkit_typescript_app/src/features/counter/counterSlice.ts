import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

// features dir contains all the store parts

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// Slice is an object that contains a Reducer function as a field name - key
// basically, a slice is a store part responsible for a SINGLE FEATURE - global state object. 
export const counterSlice = createSlice({
  // A SLICE name, used in action types in the store with Action Creator- type :"counter/increment"
  name: 'counter', // 'counter' state object in our store

  // On regular reducer: const counterReducer = (state, action) => {switch{}}
  // The initial state for the reducer - state from above
  initialState,

  // reducers - key/value pair instead of switch statements
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: { 
    // All of these are our app Reducers with key/value pairs. 
    // key - represents an Action types like const FETCH_TODOS = 'FETCH_TODOS';
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1; // to update 'counter' State object's value property in the STORE
    },
    decrement: state => {
      state.value -= 1;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    // PayloadAction is Action Creator's payload.
    /* {
        type: ActionTypes.DELETE_TODO,
        payload: id,
      }; */

    // NOTE: Here, incrementByAmount is type & it's payload is PayloadAction
    // Pass in Action Creator's payload value in PayloadAction<here>
    // NOTE: first arg - 'state' is the reference to the initial State of the reducer
    // Second arg - 'action' is Action object which has Type & Payload, can be destructure
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Note: Slice will automatically/dynamically give us Action Types - Action Creators
// Note: These are NOT reducers functions above. 
// These are Action Creators with the same name as reducers. 
// you can change name by doing - increment: incrementAction
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// Create and export the selector:
export const selectCount = (state: RootState) => state.counter.value; 
// Accessing 'counter' object of Global State in Store
// To make the Counter State accessible & reusable everywhere in other components
// for DRY code. 

// It is a convention to export reducer as a default export
// Exporting this counterSlice as counterReducer
export default counterSlice.reducer; // export reducer
