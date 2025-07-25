import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
  effect,
  SimpleChanges,
} from '@angular/core';

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

@Component({
  standalone: true,
  selector: 'toggle-list',
  templateUrl: `toggle-list.component.html`,
})
export class ToggleListComponent {
  @Input() users: User[] = [];
  @Input() selectedUserIds: string[] = [];
  @Output() openModal = new EventEmitter<boolean>();
  @Output() selectedUserIdsChange = new EventEmitter<string[]>();

  searchTerm = signal('');
  selectedIds: WritableSignal<string[]> = signal([]);

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users.filter((user) =>
      [user.email, user.name, user.surname]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUserIds']) {
      this.selectedIds.set([...this.selectedUserIds]);
    }
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  isSelected(user: User): boolean {
    return this.selectedUserIds.includes(user.id);
  }

  toggleUser(user: User): void {
    const current = [...this.selectedIds()];
    const index = current.indexOf(user.id);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(user.id);
    }
    this.selectedIds.set(current);
  }
  close(): void {
    this.openModal.emit(false);
    this.selectedUserIdsChange.emit(this.selectedIds());
  }
}
