import { Component, OnInit, ViewChild, Renderer, ElementRef, AfterViewInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { IvAuthService }        from '../iv-auth/iv-auth.service';
import {FILE_UPLOAD_DIRECTIVES } from 'ng2-file-upload';
import { IvImage }              from '../iv-image/iv-image.class';
import { IvImgUploadService }   from '../iv-image/iv-image-upload.service';
import { IvUser }               from './iv-user.class';
import { IvUserService }        from './iv-user.service';

@Component({
    selector: 'iv-private-profile',
    styleUrls: ['iv-user.component.scss'],
    templateUrl: './iv-user-private.component.html',
    directives: [FILE_UPLOAD_DIRECTIVES]
})

export class IvUserPrivateComponent implements OnInit {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('usernameInput') usernameInput: ElementRef;
    @ViewChild('emailInput') emailInput: ElementRef;

    public updateNameIntent: boolean;

    public usernameValid: boolean;
    public validatingUsername: boolean;
    public updateUsernameIntent: boolean;

    public updateEmailIntent: boolean;

    public uploader;
    public tmpAvatar: IvImage;
    public tmpUser: IvUser;
    private typingUsernameTimer;
    private doneTypingUsernameInterval: number;

    constructor(private _renderer: Renderer, private userService: IvUserService, private imgUploadService: IvImgUploadService, public authService: IvAuthService, public router: Router) {
        this.uploader = imgUploadService.uploader;
        this.doneTypingUsernameInterval = 1000;
    }

    ngOnInit(){
        this.tmpUser = IvUser.createFormJson(this.authService.currentUser);
        this.tmpUser._avatar = null;

        this.usernameValid = false;
        this.validatingUsername = false;
    }

    public startUpdateName(){
        this.updateNameIntent = true;
        setTimeout( () => {
            this._renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus', []);
        }, 100);
    }

    public cancelUpdateName(){
        this.updateNameIntent = false;
        this.tmpUser.name = JSON.parse(JSON.stringify(this.authService.currentUser.name));
    }

    public startUpdateUsername(){
        this.updateUsernameIntent = true;
        setTimeout( () => {
            this._renderer.invokeElementMethod(this.usernameInput.nativeElement, 'focus', []);
        }, 100);
    }

    public cancelUpdateUsername(){
        this.updateUsernameIntent = false;
        this.tmpUser.username = JSON.parse(JSON.stringify(this.authService.currentUser.username));
    }

    public startUpdateEmail(){
        this.updateEmailIntent = true;
        setTimeout( () => {
            this._renderer.invokeElementMethod(this.emailInput.nativeElement, 'focus', []);
        }, 100);
    }

    public cancelUpdateEmail(){
        this.updateEmailIntent = false;
        this.tmpUser.email = JSON.parse(JSON.stringify(this.authService.currentUser.email));
    }

    public onUsernameKeyUp(){
        clearTimeout(this.typingUsernameTimer);
        new Promise((resolve, reject) => {
            this.typingUsernameTimer = setTimeout(()=>{resolve(true);}, this.doneTypingUsernameInterval);
        }).then((e)=>{
            this.checkUsername();
        })
    }

    public onUsernameKeyDown(){
        this.validatingUsername = true;
        this.usernameValid = false;
        clearTimeout(this.typingUsernameTimer);
    }

    private checkUsername(){
        this.userService.getValidUsername(this.tmpUser.username).subscribe((isValid) => {
            this.usernameValid = isValid;
            this.validatingUsername = false;
        })
    }

    private updateUsername(){
        this.userService.getValidUsername(this.tmpUser.username).subscribe((isValid) => {
            if(isValid){
                var user = IvUser.createFormJson({_id: this.tmpUser._id, username: this.tmpUser.username});
                this.userService.putUser(user).subscribe((user) => {
                    this.tmpUser.username = user.username;
                    this.authService.currentUser.username = user.username;
                    this.updateUsernameIntent = false;
                })
            }
        });
    }

    public onAvatarFileChange(event) {
        this.imgUploadService.tryUploadAndGetImage(event, IvImage.getTypes().AVATAR).subscribe(image => {
            this.tmpUser._avatar = image;
        });
    }

    public updateName() {
        var user = IvUser.createFormJson({_id: this.tmpUser._id, name: this.tmpUser.name, bio: this.tmpUser.bio});
        this.userService.putUser(user).subscribe((user) => {
            this.tmpUser.name = user.name;
            this.tmpUser.bio = user.bio;
            this.authService.currentUser.name = user.name;
            this.authService.currentUser.bio = user.bio;
            this.updateNameIntent = false;
        })
    }

    public cancelUpdateAvatar() {
        this.tmpUser._avatar = null;
    }

    public updateAvatar() {
        if(this.tmpUser._avatar){
            var user = IvUser.createFormJson({_id: this.tmpUser._id, _avatar: this.tmpUser._avatar});
            this.userService.putUser(user).subscribe((user) => {
                this.authService.currentUser._avatar = this.tmpUser._avatar;
                this.tmpUser._avatar = null;
            })
        }
    }

    public unlinkAccount(type: string){
        this.authService.putUnlink(type).subscribe((sucess) => {
            switch (type) {
                case 'FACEBOOK':
                    this.authService.currentUser.facebook = null;
                    break;
                case 'TWITTER':
                    this.authService.currentUser.twitter = null;
                    break;
                case 'GOOGLE':
                    this.authService.currentUser.google = null;
                    break;
            }
        })
    }
}
