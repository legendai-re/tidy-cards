import { Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class TcHeaderService {

    public noHeader: boolean;
    updateHeader: any;

    constructor() {
        this.updateHeader = new EventEmitter();
    }

    emitUpdateHeaderEvent(val) {
        this.updateHeader.emit(val);
    }

    getUpdateHeaderEmitter() {
        return this.updateHeader;
    }

}
