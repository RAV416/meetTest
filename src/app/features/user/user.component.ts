import { Component, inject, output } from '@angular/core';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import {
  DynamicListComponent,
  DynamicListFields,
} from '../../shared/dynamic-list/dynamic-list.component';
import { ToggleListComponent } from '../../shared/modal/toggle-list.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
  imports: [RouterModule, DynamicListComponent, ToggleListComponent],
  standalone: true,
})
export class UserComponent {
  private userService = inject(UserService);
  users$ = this.userService.getAll();
  users = toSignal(this.users$, { initialValue: [] });

  service = UserService;
  mode: 'users' | 'friends' = 'users';

  mapToFields = (model: UserModel): DynamicListFields => ({
    title1: `Name: ${model.name} ${model.surname}`,
    description: `Email: ${model.email}`,
    additionalInfo: ``,
    image: `${model.image}`,
  });

  showUserModal = false;
}
