import { InputData } from './../../table/table';
import { BadInput } from './../../../core/component/common/bad-input';
import { AppError } from './../../../core/component/common/app-error';
import { DataService } from './../../services/data.service';
import { EventEmitter } from '@angular/core';
export class NewData<T> {

    ts: T[];
    newT: T;
    _newT: T;
    _closeDialog: EventEmitter<InputData<T>>;

    constructor(private service: DataService<T>, private _new: T) {
       this._newT = _new;
    }

    onChange() {
      this.newT =  Object.assign({}, this._new);
    }


    create() {
        const nT = Object.assign({}, this.newT);
        this.newT = Object.assign({}, this._newT);
        console.log('nt = ' + JSON.stringify(nT));
        this.service.create(nT)
            .subscribe(() => {
                const inputdata: InputData<T> = { data: nT, cancelDialog: false };
                this._closeDialog.emit(inputdata);
            }, (error: AppError) => {
                if (error instanceof BadInput) {
                    // this.form.setErrors(originalError);
                } else {
                    throw error;
                }
            });
    }

    /* when dialog is close with X button */
    onHide() {
        const inputdata: InputData<T> = { data: null, cancelDialog: true };
        this._closeDialog.emit(inputdata);
    }

    hideNewDialoge() {
        this.onHide();
    }

}