import { Component } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Artist} from '../../../../Artist';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'search',
    templateUrl: 'search.component.html'
})
export class SearchComponent {
    searchStr: string;
    searchRes: any;

    constructor(private _spotifyService: SpotifyService) {

    }

    searchMusic() {
        this._spotifyService.searchMusic(this.searchStr).subscribe((res: any) => {
            this.searchRes = res.artists.items;
        });
    }
}
