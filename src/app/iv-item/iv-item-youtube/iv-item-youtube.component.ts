import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { IvItemYoutube } from './iv-item-youtube.class';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'iv-item-youtube',
    templateUrl: 'iv-item-youtube.component.html',
    styleUrls: ['iv-item-youtube.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemYoutubeComponent implements OnInit {

    public displayVideo: boolean;

    @Input('itemYoutube') itemYoutube: IvItemYoutube;

    constructor(private sanitizer: DomSanitizationService) {
    }

    ngOnInit() {
        this.itemYoutube.trustedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.itemYoutube.embedUrl);
    }
}
