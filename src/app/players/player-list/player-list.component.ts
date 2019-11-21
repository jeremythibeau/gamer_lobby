import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { PlayerDetailsComponent } from '../player-details/player-details.component';
import * as _ from 'lodash';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  providers: [PlayerService]
})
export class PlayerListComponent implements OnInit {

  players: Player[]
  selectedPlayer: Player
  columns: string[]
  keyColumns: string[]

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService
      .getPlayers()
      .then((players: Player[]) => {
        this.players = players.map((player) => {
          return player;
        })
        this.columns = this.playerService.getColumns();
        this.keyColumns = this.playerService.getColumns().map(column => {
          return _.camelCase(column);
        });
      })
  }

  private getIndexOfPlayer = (playerId: String) => {
    return this.players.findIndex((player) => {
      return player._id === playerId;
    })
  }

  selectPlayer(player: Player){
    this.selectedPlayer = player;
  }

  createNewPlayer(){
    var player: Player = {
      name: '',
      rank: '',
      score: 0,
      time: '',
      favoriteGame: '',
      status: ''
    };

    this.selectPlayer(player);
  }

  deletePlayer = (playerId: String) => {
    var idx = this.getIndexOfPlayer(playerId);
    if (idx !== -1){
      this.players.splice(idx, 1);
      this.selectPlayer(null);
    }
    return this.players;
  }

  addPlayer = (player: Player) => {
    this.players.push(player);
    this.selectPlayer(player);
    return this.players;
  }

  updatePlayer = (player: Player) => {
    var idx = this.getIndexOfPlayer(player._id);
    if (idx !== -1) {
      this.players[idx] = player;
      this.selectPlayer(player);
    }
    return this.players;
  }

}
