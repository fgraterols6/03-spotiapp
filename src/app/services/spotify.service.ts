import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private CLIENT_ID     : string = '70f1b7b808ff4f6a92c9e81fd40c7934';
  private CLIENT_SECRET : string = 'a79d27936dc140ec9befa934c7b3d9bf';
  private token         : string = 'BQDU3hprM9th8sYq-BwYHSUELVs4yoF3hQqa1W4hIkYlIKpRduavKFf9q-8Tqom46FjlZVTvlNSaTCebirA';
  private headers     : HttpHeaders;
  private API_URL = {
    'TOKEN'     : '/api/token',
    'NEW_RELEASES'  : '/v1/browse/new-releases?limit=20&offset=0',
    'ARTISTS'  : '/v1/search?q=_SEARCH&type=artist'
  }

  constructor(private http: HttpClient) { 
    console.log('spotify service listo');
  }

  getUserToken() {
    let body = {
      grant_type: 'client_credentials',
      client_id: this.CLIENT_ID,
      clien_secret: this.CLIENT_SECRET
    };

    return this.http.post(this.API_URL.TOKEN, body);
  }

  getNewReleases() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })

    return this.http.get(environment.url + this.API_URL.NEW_RELEASES, {headers})
                .pipe( map( data => data['albums'].items ));
  }

  getArtists(searchText: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })

    return this.http.get(environment.url + this.API_URL.ARTISTS.replace('_SEARCH', searchText), {headers})
                .pipe( map( data => data['artists'].items ));
  }

}
