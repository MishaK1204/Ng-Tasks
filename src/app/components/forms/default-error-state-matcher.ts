import {Injectable} from "@angular/core";
import {ErrorStateMatcher} from "@angular/material/core";
import {AbstractControl, FormGroupDirective, NgForm} from "@angular/forms";

@Injectable()
export class DefaultErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return <boolean>(control && control.invalid && control.touched);
  }
}
