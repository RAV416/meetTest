import { Component, inject} from '@angular/core';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { DeleteModalComponent } from '../../shared/modal/delete-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
  imports: [RouterModule, DeleteModalComponent],
  standalone: true,
})
export class UserComponent {
  private userService = inject(UserService);
  users$: Observable<UserModel[]> = this.userService.getAll();
  users = toSignal(this.users$, { initialValue: [] });
  service = UserService;

  currentUser?: UserModel;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
  get friendUsers(): UserModel[] {
    if (!this.currentUser) return [];
    const ids = this.currentUser.friends || [];
    return this.users().filter((user) => ids.includes(user.id));
  }
  removeFriend(friendId: string) {
    if (!this.currentUser) return;
    const updatedFriends =
      this.currentUser.friends?.filter((id) => id !== friendId) ?? [];
    this.userService
      .updateOne(this.currentUser.id, {
        friends: updatedFriends,
      })
      .then(() => {
        this.currentUser!.friends = updatedFriends;
        console.log('Friend removed:', friendId);
      });
  }
  friendToDelete: UserModel | null = null;

  openDeleteModal(friend: UserModel) {
    this.friendToDelete = friend;
  }
  closeDeleteModal() {
    this.friendToDelete = null;
  }
  confirmDeleteFriend() {
    if (!this.friendToDelete || !this.currentUser) return;

    const updatedFriends =
      this.currentUser.friends?.filter(
        (id) => id !== this.friendToDelete!.id
      ) ?? [];

    this.userService
      .updateOne(this.currentUser.id, { friends: updatedFriends })
      .then(() => {
        this.currentUser!.friends = updatedFriends;
        console.log('Friend removed:', this.friendToDelete!.id);
        this.friendToDelete = null;
      });
  }
}
