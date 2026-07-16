import { Component, Input, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { User } from '../../models/User';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() users: User[] = [];
 
}
