import { combineReducers, createStore } from 'redux'
// import { authSlice } from '@app/store/reducers/auth';
import { uiSlice } from '@app/store/reducers/ui'
import { authSlice } from './reducers/auth'
// import { appSlice } from './reducers/app';

const reducers = combineReducers({
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  // app: appSlice.reducer,
})

export default createStore(reducers)
