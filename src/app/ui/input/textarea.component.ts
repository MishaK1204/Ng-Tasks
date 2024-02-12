import {Component, forwardRef, inject, Injector, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl, FormControlDirective,
  FormControlName,
  FormGroupDirective, FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";

let quantity = 0;

@Component({
  selector: 'app-textarea',
  standalone: true,
  template: `
    <textarea class="v-ui-textarea" [placeholder]="placeholder" [(ngModel)]="value" (blur)="onTouch()"></textarea>
    <div class="v-ui-textarea__error-container">
      @if (formControl?.hasError('required') && formControl?.touched) {
        <span class="v-ui-textarea__error">
        სავალდებულო ველი
      </span>
      }
    </div>
  `,
  imports: [
    FormsModule,
  ],
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    },
  ],
  host: {
    '[attr.disabled]': 'isDisabled || null',
    '[attr.aria-disabled]': 'isDisabled || null',
    '[attr.id]': 'id',
  },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  private injector = inject(Injector);
  formControl!: FormControl;

  @Input() id = `v-ui-textarea-${++quantity}`;
  @Input() placeholder = '';
  @Input() isDisabled = false;

  _value = '';

  set value(val: string) {
    if (val) {
      this._value = val;
      this.onChange(val);
    }

    this.onTouch(val);
  }

  get value() {
    return this._value;
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  ngOnInit() {
    const ngControl = this.injector.get(NgControl);

    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector.get(FormGroupDirective).getControl(ngControl);
    } else {
      this.formControl = (ngControl as FormControlDirective).form as FormControl;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(val: any): void {
    val ? this._value = val : this._value = '';
  }
}
