import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

export interface GetMoviesResponse {
  paginationKey: string,
  totalMatches: number,
  results: Movie[]
}

export interface Movie {
  id: string,
  image: {
    height: number,
    id: string,
    url: string,
    width: number,
  }
  title: string,
  titleType: string,
  year: number
}

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  private http = inject(HttpClient);

  movies = signal<GetMoviesResponse | null>(null)

  getMovies(searchValue?: string, pageIndex?: number) {
    return this.http.get<GetMoviesResponse>(`https://online-movie-database.p.rapidapi.com/title/v2/find?title=${searchValue || ''}&amp;limit=25&amp;paginationKey=${pageIndex}&amp;sortArg=moviemeter%2Casc`)
      .pipe(tap((res) => {
      this.movies.set(res);
    }));
  }
}
