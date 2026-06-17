import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users:User[]=[{

    
  id:1,
  name:'John Doe',
  lastname:'Doe',
  username:'johndoe',
  email:'w@s>ample.com',
  password:'password123',

  },
{

    
  id:2,
  name:'John Dosade',
  lastname:'Doe',
  username:'johndoe',
  email:'w@s>ample.com',
  password:'password123',

  },{

    
  id:3,
  name:'John Dsadoe',
  lastname:'Dosae',
  username:'johndoe',
  email:'w@s>asadmple.com',
  password:'password123',

  }];

  constructor() { }

  findAll():Observable<User[]>{
    return of(this.users);
  }


}
