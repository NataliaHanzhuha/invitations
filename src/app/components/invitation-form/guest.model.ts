import { FormControl } from '@angular/forms';

export interface Guest {
  name: string;
  email: string;
  // isExtraPersons: boolean;
  // extraPersonsCount: number;
  extraPerson1: string;
  extraPerson2: string;
  clientId: string;
  status?: GuestStatus;
  id?: string;
}

export interface GuestForm {
  name: FormControl<string>;
  email: FormControl<string>;
  clientId: FormControl<string>;
  // isExtraPersons: FormControl<boolean>;
  // extraPersonsCount: FormControl<number>;
  extraPerson1: FormControl<string>;
  extraPerson2: FormControl<string>;
}

export enum GuestStatus {
  New,
  Edited,
  Rejected
}
