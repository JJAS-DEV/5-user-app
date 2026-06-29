import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User>= new EventEmitter(); 

  private _idUserEventEmitter= new EventEmitter();


  constructor() { }

  get newUserEventEmitter(): EventEmitter<User>{
   return this._newUserEventEmitter; 
  }
  get idUserEventEmitter(): EventEmitter<Number>{
    return this._idUserEventEmitter
  }
  
}
