import { Directive, HostListener, ElementRef, Input, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Directive({
  selector: '[auto-resize-textarea]'
})
export class AutoResizeTextareaDirective implements OnInit {

  constructor(public element: ElementRef, private events: Events) { }
  @Input('auto-resize-textarea') maxHeight: number;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (this.adjust()) { clearInterval(interval); }
    }, 30);
    this.events.subscribe('AUTO-RESIZE-TEXTAREA-AJUST', () => { this.adjust(); });
  }

  adjust(): boolean {
    const ta = this.element.nativeElement.querySelector('textarea');
    const ion = this.element.nativeElement;
    if (ta && ion) {
      ta.style.height = null;
      ta.style.height = Math.min(ta.scrollHeight, this.maxHeight) + 'px';
      ion.style.height = ion.value !== '' ? ta.style.height : null;
      if (ta.style.height === '120px') {
        ta.style.overflow = 'auto';
      } else {
        ta.style.overflow = 'hidden';
      }
      return true;
    } else {
      this.element.nativeElement.style.overflow = 'hidden';
      this.element.nativeElement.height = null;
      this.element.nativeElement.style.height = Math.max(this.element.nativeElement.scrollHeight, this.maxHeight) + 'px';
      return false;
    }
  }
}
