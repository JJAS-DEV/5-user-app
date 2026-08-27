import { createAction, props } from "@ngrx/store";
import { User } from "../models/User";

export const findAll= createAction('findAll',props<{users:User[]}>());
export const setPaginator= createAction('setPaginator',props<{paginator:any}>());
export const find= createAction('find',props<{id:number}>());
export const add = createAction('add', props<{usernew:User}>());
export const update= createAction('update',props<{userupdate:User}>());
export const remove= createAction('remove',props<{id:number}>());

