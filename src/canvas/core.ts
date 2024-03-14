import EventEmitter from "events";


class DataBase extends EventEmitter{

    protected _initData: any;
    _value: any;

    constructor(initData: any) {
        super();
        // this._initData = _initData; 
        this._value = initData;
        this.emit('create', this);

    }

    get value(): any {
        return this._value;
    }

    delete() {
        this.emit('delete', this);
    }
    set value(newValue: any) {
        if (this._value !== newValue) {
            const oldValue = this._value;
            this._value = newValue;
            this.emit('update', this, oldValue);
        }
    }
    
    update(newValue: any) {
        const oldValue = this._value;
        this._value = newValue;
        this.emit('update', this, oldValue);
    }

}

export default DataBase