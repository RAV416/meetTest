import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  inject,
  signal,
  effect,
  TemplateRef,
} from '@angular/core';
import { Injector, Type } from '@angular/core';

export interface DynamicListFields {
  title1?: string;
  description?: string;
  additionalInfo?: string;
  image?: string;
}

export interface ListDataService{}

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
  readonly list = signal<T[] | null>(null);
  readonly miscTemplate = input<TemplateRef<{ $implicit: T }> | null>(null);

  constructor() {
    effect(() => {
      const service = this.injector.get(this.serviceType());
      service.getAll().subscribe((data: [] | null) => this.list.set(data));
    });
  }

}
