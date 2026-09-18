import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user:User;

  constructor( private sharingdata: SharingDataService, private authService:AuthService,
    private router:Router
  ){
    this.user= new User
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'error de validacion',
        'username y password requeridos',
        'error'
      )

    } else {
          this.authService.LoginUser({ username:this.user.username, password:this.user.password }).subscribe(
              {
                next: Response => {
                  const token = Response.token;
      
                  const payload = this.authService.getPayload(token);
                  const loginData = {
                    user:{ username: payload.sub },
                    isAuth: true,
                    isAdmin: payload.isAdmin
                  }
                            
                  this.authService.token = token;
                  this.authService.user = loginData;
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
     
    
    }

  }
}
