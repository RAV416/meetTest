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
  template: `
    <div class="modal-backdrop fade show" style="z-index: 1040"></div>
    <div class="modal d-block" tabindex="-1" style="z-index: 1050">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Friends</h5>
            <button type="button" class="btn-close" (click)="close()"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Search by email or name..."
              [value]="searchTerm()"
              (input)="onSearchInput($event)"
            />
            <ul class="list-unstyled">
              @for (user of filteredUsers(); track user.id) {
              <li>
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input me-2"
                    [checked]="isSelected(user)"
                    (change)="toggleUser(user)"
                  />
                  {{ user.email }} - {{ user.name + ' ' + user.surname }}
                </label>
              </li>
              }
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
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
