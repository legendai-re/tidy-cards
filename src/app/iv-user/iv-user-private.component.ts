import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { IvAuthService }          from '../iv-auth/iv-auth.service';
import {FILE_UPLOAD_DIRECTIVES }        from 'ng2-file-upload';
import { IvImage }                      from '../iv-image/iv-image.class';
import { IvImgUploadService }           from '../iv-image/iv-image-upload.service';
import { IvUser }                from './iv-user.class';
import { IvUserService }                from './iv-user.service';

@Component({
    selector: 'iv-private-profile',
    templateUrl: './iv-user-private.component.html',
    directives: [FILE_UPLOAD_DIRECTIVES]
})

export class IvUserPrivateComponent implements OnInit {

    public usernameValid: boolean;
    public validatingUsername: boolean;

    public uploader;
    public tmpAvatar: IvImage;
    public tmpUser: IvUser;
    private typingUsernameTimer;
    private doneTypingUsernameInterval: number;

    constructor(private userService: IvUserService, private imgUploadService: IvImgUploadService, public authService: IvAuthService, public router: Router) {
        this.uploader = imgUploadService.uploader;
        this.doneTypingUsernameInterval = 1000;
    }

    ngOnInit(){
        this.tmpUser = IvUser.createFormJson(this.authService.currentUser);
        this.tmpUser._avatar = null;

        this.usernameValid = false;
        this.validatingUsername = false;
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
                    this.authService.currentUser.username = this.tmpUser.username;
                    console.log('username updated');
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
        var user = IvUser.createFormJson({_id: this.tmpUser._id, name: this.tmpUser.name});
        this.userService.putUser(user).subscribe((user) => {
            this.authService.currentUser.name = this.tmpUser.name;
            console.log('name updated');
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
                console.log('avatar updated');
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
