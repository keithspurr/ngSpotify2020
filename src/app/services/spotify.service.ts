import {Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, Timestamp} from '../../../node_modules/rxjs';
import {Auth} from '../../../Auth';
import { of } from 'rxjs';
import { from } from 'rxjs';

@Injectable()
export class SpotifyService {
    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;
    // store token in memory - this app will use the same token
    // for all users since it's just a demo and no login is required
    // Requiring a login would have been easier :P
    private authUrl: string;
    private authTime: number;

    constructor(private _http: HttpClient,
    private auth: Auth) {
        // retrieve token at init
        this.getAuth().subscribe();
    }

    // front page search function
    searchMusic(str: string, type = 'artist') {
        if (str != null && str !== '') {
            return this.getAuth().pipe(mergeMap(res => {

                const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.access_token);
                this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
                return this._http.get(this.searchUrl,  {headers: headers }).pipe(map(resp => {
                    console.log(resp); // so i can see the shape of the data
                    return resp;
                }));

            }));
        }

    }

    getArtist(id: string) {
        if (id != null && id !== '') {
            return this.getAuth().pipe(mergeMap(res => {
                const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.access_token);
                this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
                return this._http.get(this.artistUrl,  {headers: headers }).pipe(map(resp => {
                    console.log(resp); // so i can see the shape of the data
                    return resp;
                }));
            }));
        }
    }

    getAlbums(artistId: string) {
        if (artistId != null && artistId !== '') {
            return this.getAuth().pipe(mergeMap(res => {

                const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.access_token);
                this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
                return this._http.get(this.albumsUrl,  {headers: headers }).pipe(map(resp => {
                    console.log(resp); // so i can see the shape of the data
                    return resp;
                }));
            }));
        }
    }

    getAlbum(id: string) {
        if (id != null && id !== '') {
            return this.getAuth().pipe(mergeMap(res => {

                const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.access_token);
                this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
                return this._http.get(this.albumUrl,  {headers: headers }).pipe(map(resp => {
                    console.log(resp); // so i can see the shape of the data
                    return resp;
                }));
            }));
        }
    }

    // use custom auth service to retrieve access token from spotify
    // This prevents my id and secret from being exposed to the public
    getAccessToken() {
        this.authUrl = 'https://obscure-lake-65975.herokuapp.com/api/authorize';
        return this._http.get(this.authUrl);
    }
    // {if (this.auth.access_token == null || this.authTime < (new Date().getSeconds() - 60))

    getAuth(): Observable<any> {
        // check current token for validity                                 subtract ten seconds to account for possible timeout
        if (this.auth.access_token != null && this.authTime != null && this.authTime < new Date().getSeconds() - 10) {
            // convert current stored token to observable
            return new Observable((observer) => {
                observer.next(this.auth);
                observer.complete();
            });
        } else {
            // retreive new token if current one invalid
            return this.getAccessToken().pipe(map((res: Auth) => {
                this.auth = res;
                this.authTime = new Date().getSeconds();
                return this.auth;
            }));
        }
    }
}
