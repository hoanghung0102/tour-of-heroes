import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../entity/hero';

@Injectable()
export class TodoStoreService {

  private readonly _heros = new BehaviorSubject<Hero[]>([]);

  readonly $hero = this._heros.asObservable();



}
