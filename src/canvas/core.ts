import EventEmitter from "events";


class DataBase extends EventEmitter{

    _value: any;

    constructor(initData: any) {
        super();
        this._value = initData;
    }

    get value(): any {
        return this._value;
    }

    create() {
        this.emit('create', this);
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