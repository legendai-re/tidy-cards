import { enableProdMode, provide }       from '@angular/core';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { IvAppComponent }         from './app/iv-app.component';
import { IV_APP_ROUTER_PROVIDERS } from './app/iv-app.routes';
import { IvLanguageService } from './app/iv-language/iv-language.service';
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    enableProdMode();
}

bootstrap(IvAppComponent, [
    IV_APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    IvLanguageService
    ])
.catch(err => console.error(err));
