import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

import * as fromIE from '../ingreso-egreso.reducer'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  storeSub: Subscription = new Subscription();

  constructor(
    private store: Store<fromIE.AppState>,
    public ieService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
        console.log(ingresoEgreso.items);
      })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ieService.borrarIngresoEgreso(item)
      .then(() => {
        Swal('Item Borrado!', `El item ${item.descripcion} fue eliminado exitosamente`, 'success');
      });
  }

}
