import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private cache: Map<string, any>;

    constructor() {
        this.cache = new Map<string, any>();
    }

    get(key: string): any {
        return this.cache.get(key);
    }

    flash(key: string): any {
        let data: any = this.cache.get(key);
        this.delete(key);
        return data;
    }

    set(key: string, value: any): this {
        this.cache.set(key, value);
        return this;
    }


    delete(key: string): boolean {
        return this.cache.delete(key);
    }
}
