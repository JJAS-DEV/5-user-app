import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User';
import { NgFor } from '@angular/common';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @Input()user: User;
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  constructor() {
    this.user = new User();
  }



  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newUserEventEmitter.emit(this.user)
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
