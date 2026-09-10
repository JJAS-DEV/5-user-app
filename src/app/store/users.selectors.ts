import { createFeatureSelector } from "@ngrx/store";


export interface UsersFormState {
  users: any[];        // o tu interfaz User
  paginator: any;      // tu objeto de paginación
  user: any | null; 
            errors:{}
 // usuario seleccionado
};



export const selectUserState = createFeatureSelector<UsersFormState>('users');
export const selectUsersFormState = createFeatureSelector<UsersFormState>('users');