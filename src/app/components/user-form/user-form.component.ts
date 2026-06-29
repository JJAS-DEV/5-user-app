import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User';
import { NgFor } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
   user: User;
  newUserEventEmitter: EventEmitter<User> = new EventEmitter();


  @Input() open:boolean=false;
  constructor( private SharingData: SharingDataService,private route:ActivatedRoute) {
    this.user = new User();

  }
  ngOnInit(): void {
    this.SharingData.selectUserEventEmitter.subscribe(user=>this.user=user);
    this.route.paramMap.subscribe(params=>{
      const id:number=+(params.get('id')||'0');

      if(id>0){
        this.SharingData.findUserByIdEventEmitter.emit(id);

      }
    }
    )

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
