import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hero} from "../entity/hero";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroesUrl'

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
  }
}
