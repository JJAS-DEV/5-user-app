import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { add, addSuccess, findAll, findAllPageable, load, remove, removeSuccess, setErrors, setPaginator, update, updateSucess } from "./users.actions";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { User } from "../models/User";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class userEffects {

    // constructor(  private actions$:Actions,
    //     private service:UserService
    // ) {}

    private actions$ = inject(Actions);
    private service = inject(UserService);
    private router = inject(Router);    

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(load),
            exhaustMap(action =>
                this.service.findAllPageable(action.page).pipe(
                    map(pageable => {
                        const users = pageable.content as User[];
                        const paginator = pageable;

                        return findAllPageable({
                            users,
                            paginator
                        });
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(add),
          exhaustMap(action=> this.service.create(action.userNew)
          .pipe(
            map(userNew=>addSuccess({userNew:  userNew}))

                
            ,
            catchError(error=>(error.status==400)?of(setErrors({errors:error.error})):EMPTY
        )

            ))))

            ;
               updateUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(update),
          exhaustMap(action=> this.service.update(action.updatedUser)
          .pipe(
            map(updatedUser=>addSuccess({userNew: updatedUser}))
                
            ,
            catchError(error=>(error.status==400)?of(setErrors({errors:error.error})):EMPTY
        )

            ))));
            
            updateaddSuccessUser$ = createEffect(() =>this.actions$.pipe(
                ofType(updateSucess),
                tap(()=>{
                        this.router.navigate(['/users/page/0']),
          

            Swal.fire({
              title: "actualizado!!",
              text: "actualizado con exito!!",
              icon: "success"
            },
            );
                    
                }
            )),{dispatch:false});


            addSuccessUser$ = createEffect(() =>this.actions$.pipe(
                ofType(addSuccess),
                tap(()=>{
                        this.router.navigate(['/users/page/0']),
          

            Swal.fire({
              title: "guardado!!",
              text: "guardado con exito!!",
              icon: "success"
            },
            );
                    
                }
            )),{dispatch:false})
        
           removeuser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(remove),
          exhaustMap(action=> this.service.remove(action.id)
          .pipe(
            map(id=>removeSuccess({id}))
                
            ,
            catchError(error=>(error.status==400)?of(setErrors({errors:error.error})):EMPTY
        )

            ))));

                aSuccessUser$ = createEffect(() =>this.actions$.pipe(
                ofType(removeSuccess),
                tap(()=>{
                        this.router.navigate(['/users/page/0']),
             Swal.fire({
                title: "Eliminado!",
                text: "Usuario eliminado con exito.",
                icon: "success"
            });
                 
            
                }
            )),{dispatch:false})
        
            
        };

          


