import { Component, OnInit }               from '@angular/core';
import { Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { IvCollectionService }             from '../tc-collection/tc-collection.service';
import { IvCollection }                    from '../tc-collection/tc-collection.class';
import { IvDataLimit }                     from '../tc-shared/tc-data-limit';
import { IvLanguageService }               from '../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-discover.component.html',
    styleUrls: ['./tc-discover.component.scss']
})
export class IvDiscoverComponent implements OnInit {

    public featuredCollections: IvCollection[];
    public popularCollections: IvCollection[];
    public lastCollections: IvCollection[];

    constructor(public t: IvLanguageService, private router: Router, private collectionService: IvCollectionService) {
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
