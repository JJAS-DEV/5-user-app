import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls:['../user-app.component.css']
})
export class UserAppComponent implements OnInit {
  title: string = 'listado de usuarios';


  

  users: User[] = [];
  constructor(
    private router:Router,
    private userService: UserService, private sharingData:SharingDataService )
    
  {   
    this.userService.findAll().subscribe(users => {
      this.users = users;
    });
  }
  ngOnInit(): void {
     
   
    this.addUser();
    this.removeUser();
    this.findUserById();

  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id=>{
      const user= this.users.find(user=>user.id==id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })

  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user=> {
        if (user.id > 0) {

          this.userService.update(user).subscribe(updatedUser => {
            this.users = this.users.map(u => (u.id == updatedUser.id) ? { ...updatedUser } : u);
                        this.router.navigate(['/users'],{state:{users: this.users}});

          });
      //   asi es mas largo  if (u.id== user.id){
      //     return {... user};
      //   }
      //   return u;
      // })

    } else {

      this.userService.create(user).subscribe(usernew=>{

        this.users = [... this.users, { ...usernew }];
                        this.router.navigate(['/users'],{state:{users: this.users}});

      });

    }

    Swal.fire(  {
      title: "guardado!!",
      text: "guardado con exito!!",
      icon: "success"
    },
  );


    })

    //le agregamos un usuario
  
 
  } 
  
  selectedUser?: User;             // propiedad para guardar el usuario encontrado
  removeUser(): void {

    this.sharingData.idUserEventEmitter.subscribe(id=>{
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
      if (result.isConfirmed) 
      this.userService.remove((Number(id))).subscribe(() => { 
        this.users = this.users.filter(user => user.id != id);
      this.router.navigate(['/users/create'],{skipLocationChange:true}).then(()=>{
        this.router.navigate(['/users'],{state:{users: this.users}})

      })});
  
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

    })




  }
  




}
