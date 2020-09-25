import { ElegidoFavoritoAction, NuevoDestinoAction } from './../Model/destinos-viajes-state.model';
import { DestinosApiClient } from './../Model/DestinosApiClient';
import { DestinoViaje } from './../Model/destino-viaje.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { state } from '@angular/animations';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all;

  constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];

    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        const f = data;
        if (f != null) {
          this.updates.push('Se eligió: ' + f.nombre);
        }
      });

    // this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
    //   if (d != null) {
    //     this.updates.push('Se ha elegido a ' + d.nombre);
    //   }
    // });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {

    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    // this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegido(d: DestinoViaje) {
    this.destinosApiClient.elegir(d);
    // this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}
