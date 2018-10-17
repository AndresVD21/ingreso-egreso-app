
import * as fromIe from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface AppState extends  AppState {
    ingresoEgreso: IngresoEgresoState;
}

const initState: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer(state = initState, action:fromIe.actions): IngresoEgresoState {
    
    switch (action.type) {
        case fromIe.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            };

        case fromIe.UNSET_ITEMS:
            return {
                items: []
            };
    
        default:
            return state;
    }

}
