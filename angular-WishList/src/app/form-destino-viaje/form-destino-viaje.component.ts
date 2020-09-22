import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: [''],
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
}
