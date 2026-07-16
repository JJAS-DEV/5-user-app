import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { User } from '../../models/User';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  title: string = 'listado de usuarios';



  users: User[] = [];


  constructor(private router: Router,
    private service: UserService, private SharingData: SharingDataService
  ) {

    if(this.router.getCurrentNavigation()?.extras.state){
      //puede esra undefined por eso se pone el signo de de exclamacion 
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }



  }
  ngOnInit(): void {
    if(this.users==undefined ||this.users.length==0){
      console.log('consulta findAll');

      this.service.findAll().subscribe(u => this.users = u);
    }

  }

  onRemoveUser(id: number): void {
    this.SharingData.idUserEventEmitter.emit(id);

  }
  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }
}
