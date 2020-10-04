import { DestinoViajeComponent } from './../destino-viaje/destino-viaje.component';
import { DestinosApiClient } from './../../Model/DestinosApiClient';
import { DestinoViaje } from './../../Model/destino-viaje.model';
import { Component, inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClientViejo } from './DestinosApiClientViejo';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [DestinosApiClient],
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = null;
  }

}
