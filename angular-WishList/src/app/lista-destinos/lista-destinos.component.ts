import { DestinoViaje } from './../Model/destino-viaje.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {

    const destino = new DestinoViaje(nombre, url);
    this.destinos.push(destino);

    console.log(this.destinos);
    return false;
  }

  elegido(d: DestinoViaje) {
    this.destinos.forEach((x) => { x.setSelected(false); });
    d.setSelected(true);
  }
}
