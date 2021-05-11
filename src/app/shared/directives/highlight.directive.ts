import { Directive, HostBinding, HostListener, Input } from "@angular/core";

// https://angular.io/guide/attribute-directives
@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @Input() highlightColor = '';

  @HostListener('mouseover')
  mouseover() {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseout')
  mouseout() {
    this.backgroundColor = 'transparent';
  }
}
