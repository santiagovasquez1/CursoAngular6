import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViaje } from './destino-viaje.model';

@Injectable()
export class DestinosApiClient {
  // destinos: DestinoViaje[];

  // // objeto observable
  // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor(private store: Store<AppState>) {
    // this.destinos = [];
  }

  public add(d: DestinoViaje) {
    this.store.dispatch(new NuevoDestinoAction(d));
    // this.destinos.push(d);
  }

  // getAll(): DestinoViaje[] {

  //   // return this.destinos;
  // }
  // getById(id: string) {
  //   // let d = this.destinos.find(d => d.id === id);
  //   // return d;
  // }

  // subscripcion al servicio
  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
    // this.destinos.forEach(d => d.setSelected(false));
    // d.setSelected(true);
    // this.current.next(d);
  }
  // Puenteo de la subscripcion
  // subscribeOnChange(fn) {
  //   // this.current.subscribe(fn);
  // }
}
