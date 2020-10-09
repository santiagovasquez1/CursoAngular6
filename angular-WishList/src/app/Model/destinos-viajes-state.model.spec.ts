import {
  reducerDestinosViajes,
  DestinosViajesState,
  intializeDestinosViajesState,
  InitMyDataAction,
  NuevoDestinoAction
} from './destinos-viajes-state.model';
import { DestinoViaje } from './destino-viaje.model';

describe('reducerDestinosViajes', () => {
  it('should reduce init data', () => {
    // setup del test
    const prevState: DestinosViajesState = intializeDestinosViajesState();
    const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);

    // acciones del modelo
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);

    // valores esperados del código
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].nombre).toEqual('destino 1');

    // tear down, ejecutar código para borrar datos insertados
  });

  it('should reduce new item added', () => {
    const prevState: DestinosViajesState = intializeDestinosViajesState();
    const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].nombre).toEqual('barcelona');
  });
});
