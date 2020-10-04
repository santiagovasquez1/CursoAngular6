import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { DestinoViaje } from './destino-viaje.model';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[];

  // // objeto observable
  // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient) {
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        console.log('destinos sub store');
        console.log(data);
        this.destinos = data.items;
      });
    this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });
  }

  add(d: DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('POST', this.config.apiEndPoint + '/my', { nuevo: d.nombre }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
        const mydb = db;
        mydb.destinos.add(d);
        console.log('todos los destinos de la db!');
        mydb.destinos.toArray().then(x => console.log(x));
      }
    });
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
