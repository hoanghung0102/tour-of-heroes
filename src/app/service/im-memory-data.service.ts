import  { InMemoryDbService } from "angular-in-memory-web-api";
import * as HeroesMock from '../mock/hero.mock'

export class ImMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroesUrl = HeroesMock.HEROES;

    return {heroesUrl};
  }
}
