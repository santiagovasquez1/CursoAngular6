import { Component, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DestinoViaje } from './../../Model/destino-viaje.model';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  minLongitud = 3;
  fg: FormGroup;
  searchResults: string[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([this.nombreValidatorParametrizable(this.minLongitud)])],
      url: ['']
    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario' + form);
    });
  }

  ngOnInit(): void {

    // tslint:disable-next-line: no-angle-bracket-type-assertion
    const eleNombre = <HTMLInputElement>document.getElementById('nombre');
    // Subscripcion al evento input en html
    const autoComplete = fromEvent(eleNombre, 'input');
    fromEvent(eleNombre, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 3),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((text: string) => ajax(this.config.apiEndPoint + '/ciudades?q=' + text))
    ).subscribe(ajaxresponse => {
      this.searchResults = ajaxresponse.response;
    });

  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {

    const longitud = control.value.toString().trim().lenght;

    if (longitud > 0 && longitud < 5) {
      return { invalidNombre: true };
    }
    else {
      return null;
    }

  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {

      const longitud = control.value.toString().trim().lenght;
      if (longitud > 0 && longitud < minLong) {
        return { minLongNombre: true };
      }
      return null;
    };
  }
}
