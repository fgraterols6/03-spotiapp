import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  artists: any[] = [];

  constructor( private _spotifyService: SpotifyService) { }

  buscar( searchText: string) {
    this._spotifyService.getArtists(searchText)
          .subscribe( (resp: any) => {
            this.artists = resp;
          });
  }

}
