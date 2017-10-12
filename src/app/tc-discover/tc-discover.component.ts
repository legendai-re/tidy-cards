import { Component, OnInit }               from '@angular/core';
import { Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { TcCollectionService }             from '../tc-collection/tc-collection.service';
import { TcCollection }                    from '../tc-collection/tc-collection.class';
import { TcDataLimit }                     from '../tc-shared/tc-data-limit';
import { TcLanguageService }               from '../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-discover.component.html',
    styleUrls: ['./tc-discover.component.scss']
})
export class TcDiscoverComponent implements OnInit {

    public featuredCollections: TcCollection[];
    public popularCollections: TcCollection[];
    public lastCollections: TcCollection[];

    constructor(public t: TcLanguageService, private router: Router, private collectionService: TcCollectionService) {
    }

    ngOnInit() {
        this.loadFeaturedCollections();
        this.loadPopularCollections();
        this.loadLastCollections();
    }

    private loadFeaturedCollections(){
        let params = new URLSearchParams();
        params.set('limit', '8');
        params.set('sort_field', 'featuredAt');
        params.set('sort_dir', '-1');
        params.set('isFeatured', 'true');
        params.set('isOnDiscover', 'true');
        this.collectionService.getCollections(params).subscribe(collections => {
            this.featuredCollections = collections;
        }, () => {});
    }

    private loadPopularCollections(){
        let params = new URLSearchParams();
        params.set('limit', '8');
        params.set('sort_field', 'starsCount');
        params.set('sort_dir', '-1');
        this.collectionService.getCollections(params).subscribe(collections => {
            this.popularCollections = collections;
        }, () => {});
    }

    private loadLastCollections(){
        let params = new URLSearchParams();
        params.set('limit', '8');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        this.collectionService.getCollections(params).subscribe(collections => {
            this.lastCollections = collections;
        }, () => {});
    }


}
