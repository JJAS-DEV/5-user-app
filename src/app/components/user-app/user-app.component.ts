import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { add, find, findAll, remove, setPaginator, update } from '../../store/users.actions';
import { selectUserState } from '../../store/users.selectors';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['../user-app.component.css']
})
export class UserAppComponent implements OnInit {
  title: string = 'listado de usuarios';
  paginator: any = {};
  PageUrl: string = '/users/page/';

  users: User[] = [];

  user!: User;


  constructor(
    private store: Store<{ users: any }>,
    private router: Router,
    private userService: UserService, private sharingData: SharingDataService
    ,
    private route: ActivatedRoute, private authservice: AuthService) {
    this.store.select('users').subscribe(state => {
      this.users = state.users;
      this.paginator = state.paginador;
      this.user = state.user;
    });

  }

  ngOnInit(): void {
    //se lo pasamos con el evento
    // this.userService.findAll().subscribe(users => {
    //   this.users = users;
    // });

    // this.route.paramMap.subscribe(params => {
    //   const page=+(params.get('page')||'0');
    //   this.userService.findAllPageable(page).subscribe(pageable => {
    //     this.users = pageable.content as User[];
    //   });
    // })

    this.addUser();
    this.removeUser();
    this.findUserById();

    this.pageUserEventEmitter();
    this.handlerlogin();

  }

  handlerlogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      console.log(username + " " + password)
      this.authservice.LoginUser({ username, password }).subscribe(
        {
          next: Response => {
            const token = Response.token;
            console.log(token);

            const payload = this.authservice.getPayload(token);
            const user = { username: payload.sub };
            const login = {
              user,
              isAuth: true,
              isAdmin: payload.isAdmin
            }
            this.authservice.token = token;
            this.authservice.user = login;
            this.router.navigate(['/users'])
            console.log(payload);
          },
          error: error => {
            if (error.status == 401) {
              console.log(error.error)
              Swal.fire('error en el login', error.error.menssage, 'error')
            } else {
              throw error;
            }

          }

        }
      )
    })

  }

  pageUserEventEmitter() {
    this.sharingData.pageUserEventEmitter.subscribe(pageable => {
       this.users = pageable.users;
     this.paginator = pageable.paginator;
      // this.store.dispatch(findAll({ users: pageable.users}))
      // this.store.dispatch(setPaginator({ paginator: pageable.paginator}))
    })
  }


  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      //const user = this.users.find(user => user.id == id);
      this.store.dispatch(find({ id }))

      this.sharingData.selectUserEventEmitter.emit(this.user);
    })

  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {

        this.userService.update(user).subscribe({
          next: (updatedUser) => {
            // this.users = this.users.map(u => (u.id == updatedUser.id) ? { ...updatedUser } : u);
            this.store.dispatch(update({ updatedUser }))

            Swal.fire({
              title: "guardado!!",
              text: "guardado con exito!!",
              icon: "success"

            },
            );


            this.router.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
          },
          error: (err) => {
            if (err.status == 400) {
              this.sharingData.errorFormEventEmitter.emit(err.error);
              console.log(err.error);
            }
          }




        });
        //   asi es mas largo  if (u.id== user.id){
        //     return {... user};
        //   }
        //   return u;
        // })

      } else {

        this.userService.create(user).subscribe({
          next: (usernew) => {

            this.users = [... this.users, { ...usernew }];
            // this.store.dispatch(add({ usernew }))
              this.router.navigate(['users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
          

            Swal.fire({
              title: "guardado!!",
              text: "guardado con exito!!",
              icon: "success"
            },
            );
          },
          error: (err) => {
            if (err.status == 400) {
              this.sharingData.errorFormEventEmitter.emit(err.error);
              console.log(err.error);
            }

          }

        });

      }




    })

    //le agregamos un usuario


  }

  selectedUser?: User;             // propiedad para guardar el usuario encontrado
  removeUser(): void {

    this.sharingData.idUserEventEmitter.subscribe(id => {
      // const usuario_remove: User | undefined = this.users.find(user => user.id === id)!;
      this.store.dispatch(remove({ id }))
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "se guro que quieres eliminar el usuario? ",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed)
          this.userService.remove((Number(id))).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
              this.router.navigate(['/users'], {
                state: {
                  users: this.users
                  , paginator: this.paginator
                }
              });
            
          });

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "usuario eliminado con exito.",
          icon: "success"
        });
        if (result.dismiss === Swal.DismissReason.cancel)
          /* Read more about handling dismissals below */
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
      });

    })




  }





}
