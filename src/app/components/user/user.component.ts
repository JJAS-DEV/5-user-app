import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { User } from '../../models/User';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  title: string = 'listado de usuarios';



   users: User[] = [];


   constructor(private router:Router,
    private service:UserService,private SharingData: SharingDataService
   ){
if(this.router.getCurrentNavigation()?.extras.state
){

  this.users=this.router.getCurrentNavigation()?.extras.state!['users'];
}else{

  this.service.findAll().subscribe(u=> this.users =u);
  
}


    

   }
 
  onRemoveUser(id: number): void {
    this.SharingData.idUserEventEmitter.emit(id);

  }
  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit',user.id],{state:{user}})
  }
}
