import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { combineReducers, legacy_createStore } from 'redux'
import rootReducer from './rootReducer'
/* export const store = configureStore({
  reducer: {
    web:webSlice,
    profile:profile,
    callsPriority:callsPriority
  },
  middleware:[thunk]
}) */

export const store = configureStore({ reducer: rootReducer,middleware:[thunk] })

// export const store = legacy_createStore(rootReducer)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch