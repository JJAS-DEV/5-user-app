import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User';
import { NgFor } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
   user: User;
   errors:any={};


  @Input() open:boolean=false;
  constructor( private SharingData: SharingDataService,private route:ActivatedRoute,private service:UserService,private router:Router) {
    this.user = new User();
      console.log("estoy en el constructor del form");
    console.log(this.errors);

  }
  ngOnInit(): void {
    this.SharingData.selectUserEventEmitter.subscribe(user=>this.user=user);


    this.SharingData.errorFormEventEmitter.subscribe(error=>this.errors=error);
    console.log("estoy en el init del form");
    console.log(this.errors);

    this.route.paramMap.subscribe(params=>{
      const id:number=+(params.get('id')||'0');

      if(id>0){
        // this.SharingData.findUserByIdEventEmitter.emit(id);
        this.service.findById(id).subscribe(user => {
          this.user = user;
        });

      }
    }
    )

  }



  onSubmit(userForm: NgForm): void {
    // if (userForm.valid) {
      this.SharingData.newUserEventEmitter.emit(this.user)
      console.log(this.user)
  

    // }


  }
  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();

    
  }


}
