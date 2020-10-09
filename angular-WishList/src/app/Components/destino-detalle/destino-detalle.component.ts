import { style } from '@angular/animations';
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

  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      id: 'countries',
      type: 'fill',
      source: 'world',
      layout: {},
      paint: {
        'fill-color': '#6F788A'
      }
    }]
  };

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
