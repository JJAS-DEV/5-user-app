import { createFeatureSelector } from "@ngrx/store";

export interface UsersState {
  users: any[];        // o tu interfaz User
  paginator: any;      // tu objeto de paginación
  user: any | null;    // usuario seleccionado
}
export const selectUserState = createFeatureSelector<UsersState>('users');