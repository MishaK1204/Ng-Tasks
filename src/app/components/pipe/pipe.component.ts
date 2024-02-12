import { Component } from '@angular/core';
import {CustomDatePipe} from "../../pipes/date.pipe";

@Component({
  selector: 'app-pipe',
  standalone: true,
  imports: [
    CustomDatePipe
  ],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss'
})
export class PipeComponent {

}
