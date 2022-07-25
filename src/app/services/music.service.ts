import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";
import * as dataAlbums from "./albums.json";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor() { }

  getArtists() {
    return fetch("https://jsonplaceholder.typicode.com/users").then(
      (response) => response.json()
    );
  }

  getArtistsFromJson() {
    return dataArtists;
  }

  getAlbumsFromJson() {
    return dataAlbums;
  }

}
