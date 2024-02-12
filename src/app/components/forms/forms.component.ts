import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CustomDatePipe} from "../../pipes/date.pipe";
import {TextareaComponent} from "../../ui/input/textarea.component";
import {ErrorStateMatcher, MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {DefaultErrorStateMatcher} from "./default-error-state-matcher";
import {MatSelect} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    CustomDatePipe,
    TextareaComponent,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: ErrorStateMatcher,
      useClass: DefaultErrorStateMatcher,
    },
  ]
})

export class FormsComponent {
  protected jobsControl = new FormArray([]);
  positions = ['Junior', 'Middle', 'Senior'];
  currentDay = new Date();

  form = new FormGroup({
    jobs: this.jobsControl,
  })

  get jobs() {
    return this.form.get('jobs') as FormArray;
  }

  getPositions(itemIndex: number) {
    return (this.jobs.at(itemIndex) as FormGroup).get('positions') as FormArray;
  }

  addJob() {
    this.jobs.push(new FormGroup({
      companyName: new FormControl<string>('', [Validators.required]),
      companyWebPage: new FormControl<string>('', [Validators.required]),
      companyDescription: new FormControl<string>('', [Validators.required]),
      positions: new FormArray([]),
    }))
  }

  removeJob(index: number) {
    this.jobs.removeAt(index);
  }

  addPosition(index: number) {
    this.getPositions(index).push(new FormGroup({
      personName: new FormControl<string>('', [Validators.required]),
      positionLevel: new FormControl<string>('', [Validators.required]),
      positionDescription: new FormControl<string>('', [Validators.required]),
      from: new FormControl<Date | null>(null, [Validators.required]),
      to: new FormControl<Date | null>(null, [Validators.required]),
    }, {validators: (this.dateRangeValidator as ValidatorFn)}))
  }

  removePosition(jobIndex: number, positionIndex: number) {
    const positions = this.getPositions(jobIndex);
    positions.removeAt(positionIndex);
  }

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const fromDate = group.get('from')?.value;
    const toDate = group.get('to')?.value;

    if (fromDate && toDate && fromDate > toDate) {
      group.get('to')?.setErrors({'dateRange': true});
      return {'dateRange': true};
    }

    group.get('to')?.setErrors(null);
    return null;
  }
}

