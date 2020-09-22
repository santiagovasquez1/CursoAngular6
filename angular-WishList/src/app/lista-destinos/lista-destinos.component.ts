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

  constructor(public destinosApiClient: DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje): boolean {

    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    return false;
  }

  elegido(d: DestinoViaje) {
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    d.setSelected(true);
  }
}
