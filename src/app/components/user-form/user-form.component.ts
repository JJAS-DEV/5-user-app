import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User';
import { NgFor } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
   user: User;
  newUserEventEmitter: EventEmitter<User> = new EventEmitter();


  @Input() open:boolean=false;
  constructor( private SharingData: SharingDataService,private router:Router) {
    if(this.router.getCurrentNavigation()?.extras.state
){

  this.user=this.router.getCurrentNavigation()?.extras.state!['user'];
}else{
      this.user = new User();

}
  }



  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.SharingData.newUserEventEmitter.emit(this.user)
      console.log(this.user)
      userForm.reset();
      userForm.resetForm();

    }


  }
  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();

    
  }


}
