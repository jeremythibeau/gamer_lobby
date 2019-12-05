import { Injectable } from '@angular/core';
import {Game} from './game';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = '/api/games';

  constructor(private http:Http) { }


  getGames(): Promise<void | Game[]> {
    return this.http.get(this.gamesUrl)
               .toPromise()
               .then(response => response.json() as Game[])
               .catch(this.handleError);
  }

  getColumns(): string[] {
    return ["Title","Platform","Genre","Rating","Publisher","Release", "Status"]
  }

  createGame(newGame: Game): Promise<void | Game> {
    return this.http.post(this.gamesUrl, newGame)
               .toPromise()
               .then(response => response.json() as Game)
               .catch(this.handleError);
  }

  deleteGame(delGameId: String): Promise<void | String> {
    return this.http.delete(this.gamesUrl + '/' + delGameId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  updateGame(putGame: Game): Promise<void | Game> {
    var putUrl = this.gamesUrl + '/' + putGame._id;
    return this.http.put(putUrl, putGame)
               .toPromise()
               .then(response => response.json() as Game)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}