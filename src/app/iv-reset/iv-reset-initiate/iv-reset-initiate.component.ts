import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvResetService }               from '../iv-reset.service';
import { IvAuthService }                from '../../iv-auth/iv-auth.service';
import { IvUserService }                from '../../iv-user/iv-user.service';
import { IvUser }                       from '../../iv-user/iv-user.class';

@Component({
    templateUrl: './iv-reset-initiate.component.html'
})

export class IvResetInitiateComponent implements OnInit, OnDestroy  {

    public user: IvUser;
    public searchData: string;
    public isSearching: boolean;
    public notFounded: boolean;
    public reseted: boolean;
    public resetError: boolean;
    private sub: any;

    constructor(
        private resetService: IvResetService,
        private userService: IvUserService,
        private route: ActivatedRoute,
        public authService: IvAuthService,
        public router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.searchData = params['user_id'];
            if(this.searchData)
                this.getUser();
        });
    }

    public getUser(){
        if(!this.searchData)
            return;
        this.isSearching = true;
        let params = new URLSearchParams();
        this.userService.getUser(this.searchData, params).subscribe((user) => {
            if(user._id){
                this.user = user;
                this.notFounded = false;
            }else{
                this.notFounded = true;
            }
            this.isSearching = false;
        })
    }

    public reSearch(){
        this.user = null;
    }

    private requestReset(){
        if(!this.user)
            return;
        this.resetService.putResetInitiate(this.user._id).subscribe((res) => {
            if(res.success){
                this.reseted = true;
            }else{
                this.resetError = true;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
