import { Component, output } from '@angular/core';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import {
  DynamicListComponent,
  DynamicListFields,
} from '../../shared/dynamic-list/dynamic-list.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
  imports: [RouterModule, DynamicListComponent],
  standalone: true,
})
export class UserComponent {
  readonly itemDeleted = output<string>();
  readonly itemAdded   = output<string>();
  readonly itemUpdated = output<{ id: string; changes: Partial<string> }>();
 
  service = UserService;
  mode: 'users' | 'friends' = 'users';
  
  mapToFields = (model: UserModel): DynamicListFields => ({
    title1: `Name: ${model.name} ${model.surname}`,
    description: `Email: ${model.email}`,
    additionalInfo: ``,
    image: `${model.image}`,
  });
}
