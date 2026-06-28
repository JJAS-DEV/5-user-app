import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrls:['../user-app.component.css']
})
export class UserAppComponent implements OnInit {
  title: string = 'listado de usuarios';
  userSelected: User;

  open:boolean=false;

  users: User[] = [];
  constructor(private userService: UserService) {
    this.userSelected = new User();

  }
  ngOnInit(): void {
    this.userService.findAll().subscribe(users => {
      this.users = users;
    });
  }

  addUser(user: User) {

    //le agregamos un usuario
    if (user.id > 0) {
      this.users = this.users.map(u => (u.id == user.id) ? { ...user } : u);
      //   asi es mas largo  if (u.id== user.id){
      //     return {... user};
      //   }
      //   return u;
      // })

    } else {
      this.users = [... this.users, { ...user, id: new Date().getTime() }]

    }

    Swal.fire({
      title: "guardado!!",
      text: "guardado con exito!!",
      icon: "success"
    });

    this.userSelected = new User();
    this.setOpen();

  } 
  
  selectedUser?: User;             // propiedad para guardar el usuario encontrado
  removeUser(id: number): void {
     this.selectedUser = this.users.find(user => user.id === id);
const usuario_remove: User | undefined = this.users.find(user => user.id === id)!;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "se guro que quieres eliminar el usuario? " + usuario_remove.name,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) this.users = this.users.filter(user => user.id != id);
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "usuario eliminado con exito.",
        icon: "success"
      });
      if (result.dismiss === Swal.DismissReason.cancel)
        /* Read more about handling dismissals below */
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
    });



  }
  setselectedUser(user: User): void {
    this.userSelected = { ...user };
    this.open=true;


  }


  setOpen(){
    this.open= !this.open;

  }

}
