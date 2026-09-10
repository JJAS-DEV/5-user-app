import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User';
import { NgFor } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { selectUsersFormState, selectUserState } from '../../store/users.selectors';
import { add, find, resetUser, update } from '../../store/users.actions';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
   user: User;
   errors:any={};


  @Input() open:boolean=false;
  constructor( private SharingData: SharingDataService,
    private route:ActivatedRoute,private service:UserService,private router:Router,
    private store:Store<{users:any}>
  ) {

    this.user = new User();
    //   console.log("estoy en el constructor del form");
    // console.log(this.errors);

    this.store.select(selectUsersFormState).subscribe(state=>{

      this.errors=state.errors;
      this.user={...state.user};

    })

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
              this.store.dispatch(find({ id }))
        
        // this.service.findById(id).subscribe(user => {
        //   this.user = user;
        // });

      }
    }
    )

  }



  onSubmit(userForm: NgForm): void {
    // if (userForm.valid) {
      // this.SharingData.newUserEventEmitter.emit(this.user)
      // console.log(this.user)
  

    // }

    if (this.user.id > 0) {
      this.store.dispatch(update({ updatedUser: this.user }))

    } else {
      this.store.dispatch(add({userNew: this.user}))

    }



  }
  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();

    
  }


}
