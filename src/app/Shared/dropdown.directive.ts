import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'myDir',
})
export class DropdownDirective {
  @HostBinding('class.show') isShow = false;

  @HostListener('click') toggleShow() {
    this.isShow = !this.isShow;
  }
}
