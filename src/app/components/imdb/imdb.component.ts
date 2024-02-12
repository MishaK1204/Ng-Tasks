import {Component, DestroyRef, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ImdbService} from "../../services/imdb.service";
import {AsyncPipe} from "@angular/common";
import {MovieComponent} from "./movie/movie.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {debounceTime} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-imdb',
  standalone: true,
  imports: [
    AsyncPipe,
    MovieComponent,
    MatPaginator,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './imdb.component.html',
  styleUrl: './imdb.component.scss',
  host: {
    '[class.ng-tasks-imdb]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class ImdbComponent implements OnInit {
  protected searchControl = new FormControl<string>('');

  private destroyRef$ = inject(DestroyRef);
  public imdbService = inject(ImdbService);

  ngOnInit() {
    this.getMovies()

    this.searchControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef$), debounceTime(500)).subscribe((res) => {
      res && this.getMovies();
    })
  }

  getMovies(pageIndex?: number) {
    const searchValue = this.searchControl.value || '';

    this.imdbService.getMovies(searchValue, pageIndex || 0).subscribe()
  }

  paginate(page: PageEvent) {
    this.getMovies(page.pageIndex)
  }
}
