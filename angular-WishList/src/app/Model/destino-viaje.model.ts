export class DestinoViaje {
  nombre: string;
  imagenUrl: string;
  public servicios: string[];
  private selected: boolean;

  constructor(n: string, u: string) {
    this.servicios = ['Gimnasio', 'Desayuno'];
    this.nombre = n;
    this.imagenUrl = u;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(s: boolean) {
    this.selected = s;
  }
}
