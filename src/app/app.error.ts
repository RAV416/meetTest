import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  template: `
    <div class="px-4 py-5 my-5 text-center">
      <h1>Hello</h1>

    </div>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class NotFoundComponent {}
