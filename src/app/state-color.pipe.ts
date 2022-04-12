import { Pipe, PipeTransform } from '@angular/core';
import {PregState} from "./services/patient-state.service";

type PregString = 'FETALCARE' | 'HOME' | 'DELIVERED' | 'NICU';

export type TypeMap<T extends string | number | symbol> = {
  [key in T]: string;
};
const stateColorMap : TypeMap<PregString> = {
  FETALCARE: '#ca5699',
  HOME: '#73b44a',
  DELIVERED: '#0090b4',
  NICU: '#99336e',
}

@Pipe({
  name: 'stateColor'
})
export class StateColorPipe implements PipeTransform {

  transform(value: PregState | PregString | null): string {
    if (!value) return '#000';

    if (typeof value === "number") {
      value = PregState[value] as PregString;
    }

    try {
      return stateColorMap[value!];
    } catch (_) {
      return 'error';
    }

  }
}
