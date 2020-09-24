import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.model';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[];

  // objeto observable
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
  }

  public add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }
  getById(id: string) {
    let d = this.destinos.find(d => d.id === id);
    return d;
  }

  // subscripcion al servicio
  elegir(d: DestinoViaje) {
    this.destinos.forEach(d => d.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }
  // Puenteo de la subscripcion
  subscribeOnChange(fn) {
    this.current.subscribe(fn);
  }
}
