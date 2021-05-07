import { Subscription } from "rxjs";

export class SubKeeper {

    private readonly _subs = new Set<Subscription>();

    set plus(sub: Subscription) {
        this._subs.add(sub);
    }

    unsubAll() {
        this._subs.forEach(s => s.unsubscribe());
    }
    
}