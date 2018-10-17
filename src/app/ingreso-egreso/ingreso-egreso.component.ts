import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ieForm: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    public ieService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.ieForm = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    })

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction())
    console.log(this.ieForm.value);
    const ingresoEgreso = new IngresoEgreso({
      ...this.ieForm.value,
      tipo: this.tipo
    });
    console.log(ingresoEgreso);
    this.ieService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction())
        Swal('Creado', ingresoEgreso.descripcion, 'success');
        this.ieForm.reset({ monto: 0 });
      })
  }

}
