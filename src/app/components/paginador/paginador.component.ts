import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'paginador',
  imports: [RouterModule],
  templateUrl: './paginador.component.html',
})
export class PaginadorComponent {
  @Input() url: string = '';
  @Input() paginator:any={};


}
