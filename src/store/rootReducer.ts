import { combineReducers } from '@reduxjs/toolkit'
import profileSlices from './slice/profileSlice'


const rootReducer = combineReducers({
    profile: profileSlices
} as any)


export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
