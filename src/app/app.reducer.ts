
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromIe from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // ingresoEgreso: fromIe.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    // ingresoEgreso: fromIe.ingresoEgresoReducer
};
