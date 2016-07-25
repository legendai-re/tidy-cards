import { enableProdMode, provide }       from '@angular/core';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { IvAppComponent }         from './app/iv-app.component';
import { IvAuthService }         from './app/iv-auth/iv-auth.service';
import { IV_APP_ROUTER_PROVIDERS } from './app/iv-app.routes';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    enableProdMode();
}

bootstrap(IvAppComponent, [
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    IV_APP_ROUTER_PROVIDERS
    ])
.catch(err => console.error(err));
