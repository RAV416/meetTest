import { Component, inject } from '@angular/core';
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
  service = UserService;

  mapToFields = (model: UserModel): DynamicListFields => ({
    title1: `Name: ${model.name} ${model.surname}`,
    description: `Email: ${model.email}`,
    additionalInfo: ``,
    image: `${model.image}`,
  });
}
