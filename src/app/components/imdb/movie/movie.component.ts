import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Movie} from "../../../services/imdb.service";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  host: {
    '[class.ng-tasks-movie__container]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class MovieComponent {
  @Input() movie!: Movie;
}
