import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { EventModel } from '../../features/event/event.model';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-delete-modal',

  template: `
    <div class="modal d-block" tabindex="-1" style="z-index: 1050">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ">
          <div class="modal-header ">
            <h5 class="modal-title text-danger">⚠️ Warning</h5>
            <button
              type="button"
              class="btn-close"
              (click)="toggleModal()"
            ></button>
          </div>
          <div class="modal-body text-center">
            <ng-content>
              <p>
                Are you sure you want to remove? This action cannot
                be undone.
              </p>
            </ng-content>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              (click)="toggleModal()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              (click)="confirmDelete()"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DeleteModalComponent {
  @Input() item!: EventModel;
  @Input() id!: string;
  @Output() deleteClick = new EventEmitter<string>();
  @Output() closeClick = new EventEmitter<void>();
  showModal = signal(false);

  toggleModal() {
    this.closeClick.emit();
  }
  open() {
    this.showModal.set(true);
  }
  close() {
    this.showModal.set(false);
  }
  confirmDelete() {
    this.deleteClick.emit(this.id);
    this.close();
  }
}
