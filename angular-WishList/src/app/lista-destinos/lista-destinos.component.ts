import { DestinosApiClient } from './../Model/DestinosApiClient';
import { DestinoViaje } from './../Model/destino-viaje.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(public destinosApiClient: DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje): boolean {

    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    return false;
  }

  elegido(d: DestinoViaje) {
    this.destinosApiClient.elegir(d);
  }
}
