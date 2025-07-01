import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  inject,
  signal,
  effect,
  TemplateRef,
  output,
} from '@angular/core';
import { Injector, Type } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface DynamicListFields {
  title1?: string;
  description?: string;
  additionalInfo?: string;
  image?: string;
}

export interface ListDataService<T = any> {
  getAll(): Observable<T[]>;
  add?(item: T): Promise<void>;
  delete?(id: string): Promise<void>;
  update?(id: string, item: Partial<T>): Promise<void>;
}
@Component({
  selector: 'app-dynamic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./dynamic-list.component.html`,
})
export class DynamicListComponent<T> {
  private injector = inject(Injector);

  readonly serviceType = input<Type<ListDataService>>();
  readonly fieldMapper = input<(item: T) => DynamicListFields>(() => ({}));
  readonly miscTemplate = input<TemplateRef<{ $implicit: T }> | null>(null);
  readonly list = signal<T[] | null>(null);

 
  constructor() {
    effect(() => {
      const service = this.injector.get(this.serviceType());
      service.getAll().subscribe((data: [] | null) => this.list.set(data));
    });
  }
}
