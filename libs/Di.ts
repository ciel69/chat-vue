import Bottle from 'bottlejs';

export default class Di {
    private _di: Bottle;

    constructor() {
        this._di  = new Bottle();
    }
    get di(): Bottle {
        return this._di;
    }

    public factory(name: string, Factory: ((...any: any[]) => any)): void {
        this.di.service(name, Factory);
    }

    public get(name: string): Bottle.IContainer {
        return this.di.container[name];
    }
}