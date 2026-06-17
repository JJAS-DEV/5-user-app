import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
  title: string = 'listado de usuarios';

  users :User[] = [];
  constructor( private userService:UserService){}
  ngOnInit(): void {
    this.userService.findAll().subscribe(users=>{
      this.users=users;
    });
    throw new Error('Method not implemented.');
  }
   

}
