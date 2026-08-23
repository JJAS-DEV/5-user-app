import { Component, Input, input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() users: User[] = [];
 @Input() paginator:any={};

 constructor (private authService:AuthService, private router:Router){

 }

 get login(){
  return this.authService.user;

 }
 get admin(){
  return this.authService.isAdmin();
 }
 handlerLogout(){
  this.authService.logout();

  this.router.navigate(['/login'])
  
 }
}
