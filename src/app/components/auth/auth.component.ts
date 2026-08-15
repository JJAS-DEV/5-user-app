import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user:User;

  constructor(){
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
      console.log(this.user);
    }

  }
}
