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
  PageUrl: string = '/users/page/';
  

  user!: User;


  constructor(
    private store: Store<{ users: any }>,
    private router: Router,
    private userService: UserService, private sharingData: SharingDataService
    ,
    private route: ActivatedRoute, private authservice: AuthService) {
    this.store.select(selectUserState).subscribe(state => {
  
      this.user = {... state.user};
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
            this.router.navigate(['/users/page/0'])
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








  selectedUser?: User;             // propiedad para guardar el usuario encontrado




}
