import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type {  AppDispatch,RootState } from '../store/store'
import { AnyAction, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
// import { RootState } from '../store/rootReducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppDispatch  =()=>useDispatch<AppDispatch>()
export const useAppDispatch  =() => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector