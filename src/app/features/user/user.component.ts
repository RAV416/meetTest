import { Component, inject, output, TemplateRef } from '@angular/core';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import {
  DynamicListComponent,
  DynamicListFields,
  ListDataService,
} from '../../shared/dynamic-list/dynamic-list.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
  imports: [RouterModule, DynamicListComponent],
  standalone: true,
})
export class UserComponent {
  mode: 'users' | 'friends' = 'users';
  private userService = inject(UserService);
  service = UserService;
  readonly itemDeleted = output<string>();
  readonly itemAdded   = output<string>();
  readonly itemUpdated = output<{ id: string; changes: Partial<string> }>();

  deleteItem(model: UserModel): void {
    this.userService.deleteOne(model.id);
    console.log('Deleting user:', model.id);
  }

  mapToFields = (model: UserModel): DynamicListFields => ({
    title1: `Name: ${model.name} ${model.surname}`,
    description: `Email: ${model.email}`,
    additionalInfo: ``,
    image: `${model.image}`,
  });
}
