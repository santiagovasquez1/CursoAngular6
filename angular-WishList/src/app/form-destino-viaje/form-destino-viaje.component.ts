import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DestinoViaje } from '../Model/destino-viaje.model';

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

  constructor(fb: FormBuilder) {
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
