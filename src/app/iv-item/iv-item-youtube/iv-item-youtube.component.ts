import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer   } from '@angular/platform-browser';
import { IvItemYoutube } from './iv-item-youtube.class';

@Component({
    selector: 'iv-item-youtube',
    templateUrl: 'iv-item-youtube.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-youtube.component.scss']
})

export class IvItemYoutubeComponent implements OnInit {

    @Input() itemYoutube: IvItemYoutube;

    public displayVideo: boolean;

    constructor(private sanitizer: DomSanitizer  ) {
    }

    ngOnInit() {
        this.itemYoutube.trustedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.itemYoutube.embedUrl);
    }
}
