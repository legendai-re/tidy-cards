import { Component, OnInit, OnDestroy }    from '@angular/core';
import { Router }               from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { IvAuthService }          from '../iv-auth/iv-auth.service';
import { IvHeaderService }      from './iv-header.service';

@Component({
    selector: 'iv-header',
    templateUrl: './iv-header.component.html',
    styleUrls: ['./iv-header.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})
export class IvHeaderComponent implements OnInit, OnDestroy{

    public type: string;
    public color: string;
    public image: any;
    public title: string;
    public noHeader: boolean;
    private sub: any;
    private defaultColor: string;

    constructor(public sanitize: DomSanitizationService, public headerService: IvHeaderService, public authService: IvAuthService, public router: Router) {
        this.defaultColor = '6B5DFF';
        this.router.events.subscribe((route) => {
            this.setDefault();
        })
    }

    ngOnInit() {
        this.sub = this.headerService.getUpdateHeaderEmitter()
        .subscribe((value) => {
            this.updateHeader(value);
        });
    }

    private updateHeader(event){
        if(event.value.type === 'DEFAULT'){
            this.setDefault();
        }else if(event.value.type === 'NO_HEADER'){
            this.noHeader = true;
        }else{
            this.type = event.value.type;
            this.color = event.value.color;
            this.image = event.value.image;
            this.title = event.value.title;
        }
    }

    private setDefault(){
        this.noHeader = false;
        this.color = this.defaultColor;
        this.image = null;
        this.title = '';
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}


