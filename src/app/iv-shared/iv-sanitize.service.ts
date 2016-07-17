import { Injectable }             from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Injectable()
export class IvSanitizeService {

    constructor(private sanitizer: DomSanitizationService) {
    }

    public trustHtml(entry){
        return this.sanitizer.bypassSecurityTrustHtml(entry);
    }

    public trustRessourceUrl(entry){
        return this.sanitizer.bypassSecurityTrustResourceUrl(entry);
    }

    public trustUrl(entry){
        return this.sanitizer.bypassSecurityTrustUrl(entry);
    }
}
