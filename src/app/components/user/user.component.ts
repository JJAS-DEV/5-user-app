import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html',
})
export class UserComponent {


  @Input() users:User []=[];

  @Output() idUserEventEmitter= new EventEmitter();
  @Output () selectUserEventEmitter= new EventEmitter();
  onRemoveUser(id:number): void{
    this.idUserEventEmitter.emit(id);

  }
  onSelectedUser(user:User):void{
    this.selectUserEventEmitter.emit(user);
  }
}
