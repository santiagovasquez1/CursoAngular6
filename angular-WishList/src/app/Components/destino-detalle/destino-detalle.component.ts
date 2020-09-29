import { DestinosApiClient } from './../../Model/DestinosApiClient';
import { DestinoViaje } from './../../Model/destino-viaje.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = null;
  }

}
