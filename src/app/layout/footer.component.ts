import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-light text-center py-3 mt-auto border-top">
      <div class="container">
        <span class="text-muted"
          >&copy; 2025 SpotkaniaApp. All rights reserved.</span
        >
      </div>
    </footer>
  `,
  imports: [],
  styles: [],
  standalone: true,
})
export class FooterComponent {}
