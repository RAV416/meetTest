import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[voteProgress]',
  standalone: true,
})
export class VoteProgressDirective implements OnChanges {
  @Input() votes = 0;
  @Input() total = 1;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const percent = Math.min(100, Math.round((this.votes / this.total) * 100));
    this.renderer.setStyle(this.el.nativeElement, 'background', `
      linear-gradient(to right, #89d0ffff ${percent}%, transparent ${percent}%)
    `);
  }
}