import { createFeatureSelector } from "@ngrx/store";

export interface initialLogin  {
    isAuth: false,
    isAdmin: false,
    user: undefined
}
export const selectAuthState = createFeatureSelector<initialLogin>('auth');
