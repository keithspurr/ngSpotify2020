import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable()
export class SpotifyService {
    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;

    constructor(private _http: Http) {

    }

    searchMusic(str: string, type = 'artist') {
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
        return this._http.get(this.searchUrl)
            .pipe(map(res => res.json()));
    }

    getArtist(id: string) {
        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this._http.get(this.artistUrl)
            .pipe(map(res => res.json()));
    }

    getAlbums(artistId: string) {
        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
        return this._http.get(this.albumsUrl)
            .pipe(map(res => res.json()));
    }

    getAlbum(id: string) {
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
        return this._http.get(this.albumUrl)
            .pipe(map(res => res.json()));
    }
}
