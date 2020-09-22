import { Injectable } from '@angular/core';
import { DestinoViaje } from './destino-viaje.model';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  public add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }
}
