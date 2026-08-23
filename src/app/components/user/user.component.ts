import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data/sharing-data.service';
import { PaginadorComponent } from '../paginador/paginador.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user',
  imports: [RouterModule, PaginadorComponent],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  title: string = 'listado de usuarios';



  users: User[] = [];
  paginator:any={};
  PageUrl: string = '/users/page';
  constructor(private router: Router,
    private service: UserService, private SharingData: SharingDataService, private route: ActivatedRoute,
    private authservice:AuthService
  ) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      //puede esra undefined por eso se pone el signo de de exclamacion 
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }



  }
  ngOnInit(): void {
    if (this.users == undefined || this.users.length == 0) {
      console.log('consulta findAll');

      // this.service.findAll().subscribe(u => this.users = u);

      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.SharingData.pageUserEventEmitter.emit({ users: this.users, paginator: this.paginator });
        });
      })

    }

  }

  onRemoveUser(id: number): void {
    this.SharingData.idUserEventEmitter.emit(id);

  }
  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin(){
    return this.authservice.isAdmin();
  }
}
