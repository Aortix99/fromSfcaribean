import { AbstractControl } from "@angular/forms"    

export class MyValidators{
    static isValueValid(control: AbstractControl){
        const value = control.value;
        if((typeof value !== 'number') || (value <= 0)){
            return {value_invalid: true}
        }
        return null;
    }

    static isDateValid(control: AbstractControl){
        const v1 = new Date();
        const v2 = new Date(control.value);
        if(control.value !== null && typeof control.value === 'object'){
            const now = Number(`${v1.getFullYear()}${(v1.getMonth() < 10)? '0' + v1.getMonth() : v1.getMonth()}${(v1.getDate() < 10)? '0' + v1.getDate() : v1.getDate()}`)
            const value = Number(`${v2.getFullYear()}${(v2.getMonth() < 10)? '0' + v2.getMonth() : v2.getMonth()}${(v2.getDate() < 10)? '0' + v2.getDate() : v2.getDate()}`)
            if((typeof value !== 'number') || (value < now)){
                return {date_invalid : true}
            }
            return null; 
        }
        return {date_invalid : true}
    }

    static masterParamsValid(control: AbstractControl){
        const value = control.value;
        if(value.includes('.')){
            return {param_point_invalid : true};
        }
        let values : Array<any> = value.split(',');
        for(let v of values){
            if(isNaN(v)){
                return {param_nan_invalid : true}
            }
        }
        return null;
    }
}