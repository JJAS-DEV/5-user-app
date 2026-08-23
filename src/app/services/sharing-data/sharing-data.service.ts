import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User>= new EventEmitter(); 

  private _idUserEventEmitter= new EventEmitter();

  private _findUserByIdEventEmitter= new EventEmitter();
  private _selectUserEventEmitter= new EventEmitter();

  private _errorFormEventEmitter= new EventEmitter();
  private _pageUserEventEmitter= new EventEmitter();
  private _handlerLoginEventEmitter= new EventEmitter();


  constructor() { }

 get handlerLoginEventEmitter(){
  return this._handlerLoginEventEmitter;
 }
  get pageUserEventEmitter(): EventEmitter<{ users: User[], paginator: any }>{
    return this._pageUserEventEmitter;
  }

  get errorFormEventEmitter(): EventEmitter<any>{
    return this._errorFormEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<User>{
   return this._newUserEventEmitter; 
  }
  get idUserEventEmitter(): EventEmitter<Number>{
    return this._idUserEventEmitter
  }

  get findUserByIdEventEmitter ():EventEmitter<number> {

    return this._findUserByIdEventEmitter;


  }

  get selectUserEventEmitter ():EventEmitter<User>{
    return this._selectUserEventEmitter;

  }
  
}
