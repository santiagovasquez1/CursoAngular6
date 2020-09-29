import { AuthService } from './services/auth.service';
import { DestinosApiClient } from './Model/DestinosApiClient';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinosViajesEffects, DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes } from './Model/destinos-viajes-state.model';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ListaDestinosComponent } from './Components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './Components/destino-detalle/destino-detalle.component';
import { DestinoViajeComponent } from './Components/destino-viaje/destino-viaje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './Components/form-destino-viaje/form-destino-viaje.component';
import { LoginComponent } from './Components/login/login/login.component';
import { ProtectedComponent } from './Components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/Usuario/usuario-logueado.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [UsuarioLogueadoGuard] },
];

// redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: intializeDestinosViajesState()
};
// fin redux init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, {
      initialState: reducersInitialState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [DestinosApiClient, AuthService, UsuarioLogueadoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
