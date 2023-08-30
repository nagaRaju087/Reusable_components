import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Remove all non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue !== inputValue) {
      input.value = numericValue;
      input.dispatchEvent(new Event('input'));
    }
  }
}
