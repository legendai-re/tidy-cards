import { Component, OnInit, ViewChild, Renderer, ElementRef }    from '@angular/core';
import { Router }               from '@angular/router';
import { FILE_UPLOAD_DIRECTIVES } from 'ng2-file-upload';
import { IvAuthService }        from '../../iv-auth/iv-auth.service';
import { IvImage }              from '../../iv-image/iv-image.class';
import { IvImgUploadService }   from '../../iv-image/iv-image-upload.service';
import { IvUser }               from '../iv-user.class';
import { IvUserService }        from '../iv-user.service';

@Component({
    selector: 'iv-private-profile',
    styleUrls: ['../iv-user.component.scss'],
    templateUrl: './iv-user-private.component.html',
    directives: [FILE_UPLOAD_DIRECTIVES]
})

export class IvUserPrivateComponent implements OnInit {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('usernameInput') usernameInput: ElementRef;
    @ViewChild('emailInput') emailInput: ElementRef;

    public updateGeneralInfoIntent: boolean;
    public isUpdadingGeneralInfo: boolean;

    public avatarFileInput: any;
    public isUploadingAvatar: boolean;
    public usernameState: string;
    public validatingUsername: boolean;

    public updateUsernameIntent: boolean;
    public isUpdatingUsername: boolean;

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

        this.usernameState = 'PENDING';
        this.validatingUsername = false;
    }

    public startUpdateGeneralInfo(){
        this.updateGeneralInfoIntent = true;
        setTimeout( () => {
            this._renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus', []);
        }, 100);
    }

    public cancelUpdateGeneralInfo(){
        if(this.isUpdadingGeneralInfo)
            return;
        this.updateGeneralInfoIntent = false;
        this.tmpUser._avatar = null;
        this.tmpUser.name = JSON.parse(JSON.stringify(this.authService.currentUser.name));
        this.tmpUser.bio = this.authService.currentUser.bio ? JSON.parse(JSON.stringify(this.authService.currentUser.bio)) : '';
        this.isUploadingAvatar = false;
    }

    public startUpdateUsername(){
        this.updateUsernameIntent = true;
        setTimeout( () => {
            this._renderer.invokeElementMethod(this.usernameInput.nativeElement, 'focus', []);
        }, 100);
    }

    public cancelUpdateUsername(){
        if(this.isUpdatingUsername)
            return;
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
        this.usernameState = IvUser.isValidUsername(this.tmpUser.username) ? 'VALIDATING' : 'INVALID';
        clearTimeout(this.typingUsernameTimer);
        new Promise((resolve, reject) => {
            this.typingUsernameTimer = setTimeout(()=>{resolve(true);}, this.doneTypingUsernameInterval);
        }).then((e)=>{
            if(IvUser.isValidUsername(this.tmpUser.username))
            this.checkUsername();
        })
    }

    public onUsernameKeyDown(){
        clearTimeout(this.typingUsernameTimer);
    }

    private checkUsername(){
        this.userService.getValidUsername(this.tmpUser.username).subscribe((isValid) => {
            this.usernameState = isValid ? 'FREE' : 'TAKEN';
            this.validatingUsername = false;
        })
    }

    public updateUsername(){
        this.isUpdatingUsername = true;
        this.userService.getValidUsername(this.tmpUser.username).subscribe((isValid) => {
            if(isValid){
                let user = IvUser.createFormJson({_id: this.tmpUser._id, username: this.tmpUser.username});
                this.userService.putUser(user).subscribe((userResponse) => {
                    this.tmpUser.username = userResponse.username;
                    this.authService.currentUser.username = userResponse.username;
                    this.updateUsernameIntent = false;
                    this.isUpdatingUsername = false;
                })
            }
        });
    }

    public onAvatarFileChange(event) {
        this.isUploadingAvatar = true;
        this.imgUploadService.tryUploadAndGetImage(event, IvImage.getTypes().AVATAR).subscribe(image => {
            if(image && this.updateGeneralInfoIntent)
                this.tmpUser._avatar = image;
            this.isUploadingAvatar = false;
        });
    }

    public updateGeneralInfo() {
        if(this.isUploadingAvatar)
            return;
        this.isUpdadingGeneralInfo = true;
        let user = new IvUser();
        user._id = this.tmpUser._id;
        user.name = this.tmpUser.name;
        user.bio = this.tmpUser.bio;
        if(this.tmpUser._avatar)
            user._avatar = this.tmpUser._avatar;
        this.userService.putUser(user).subscribe((userResponse) => {
            this.authService.currentUser.name = userResponse.name;
            this.authService.currentUser.bio = userResponse.bio;
            if(this.tmpUser._avatar)
                this.authService.currentUser._avatar = this.tmpUser._avatar;
            this.tmpUser.name = userResponse.name;
            this.tmpUser.bio = userResponse.bio;
            this.tmpUser._avatar = null;
            this.updateGeneralInfoIntent = false;
            this.isUpdadingGeneralInfo = false;
        }, (err) => {
            console.log('sry something went wrong while updating your general info');
            this.isUpdadingGeneralInfo = false;
            this.cancelUpdateGeneralInfo();
        })
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
