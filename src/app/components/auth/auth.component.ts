import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user:User;

  constructor( private sharingdata: SharingDataService){
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

      this.sharingdata.handlerLoginEventEmitter.emit({username:this.user.username,password:this.user.password})
    
    }

  }
}
