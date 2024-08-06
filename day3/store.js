import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const rootReducer = combineReducers({
  // Add your reducers here
});

const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;