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

    public uploader;
    public tmpAvatar: IvImage;
    public tmpUser: IvUser;

    constructor(private userService: IvUserService, private imgUploadService: IvImgUploadService, public authService: IvAuthService, public router: Router) {
        this.uploader = imgUploadService.uploader;
    }

    ngOnInit(){
        this.tmpUser = IvUser.createFormJson(this.authService.currentUser);
        this.tmpUser._avatar = null;
    }

    public onAvatarFileChange(event) {
        this.imgUploadService.tryUploadAndGetImage(event, IvImage.getTypes().AVATAR).subscribe(image => {
            this.tmpUser._avatar = image;
        });
    }

    public updateName() {
        this.userService.putUser(this.tmpUser).subscribe((user) => {
            this.authService.currentUser.name = this.tmpUser.name;
            console.log('name updated');
        })
    }

    public cancelUpdateAvatar() {
        this.tmpUser._avatar = null;
    }

    public updateAvatar() {
        if(this.tmpUser._avatar){
            this.userService.putUser(this.tmpUser).subscribe((user) => {
                this.authService.currentUser._avatar = this.tmpUser._avatar;
                this.tmpUser._avatar = null;
                console.log('avatar updated');
            })
        }
    }
}
