import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { InitMyDataAction } from '../Model/destinos-viajes-state.model';

export interface AppConfig {
  apiEndPoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable({
  providedIn: 'root'
})
export class AppLoadServiceService {

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
