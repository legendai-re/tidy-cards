import { Component } 			from '@angular/core';
import { ROUTER_DIRECTIVES } 	from '@angular/router';
import { CollectionService }   	from './collection/collection.service';
import { AuthService } 			from './auth/auth.service';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [CollectionService]
})
export class AppComponent {
	constructor(public authService: AuthService) {
		authService.initCurrentUser();      
    }
}
