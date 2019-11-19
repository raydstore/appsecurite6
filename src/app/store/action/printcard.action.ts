export const PRINTACCIDENT = 'accident';
export const PRINTMARK     = 'mark';
export const PRINTCARD     = 'printcard';

export interface PrintParams {
  viewname: string,
  id: number,
  showcard: boolean,
}

export class ActionPrintCard {
  type: string = PRINTCARD;
  payload: PrintParams;

  constructor(payload: PrintParams) {
     this.payload = payload;
  }
}

export class PrintAccidentAction {
  type: string = PRINTACCIDENT;
  payload: number;

  constructor(payload: number) {
     this.payload = payload;
  }
}

export class PrintMarkAction {
  type: string = PRINTMARK;
  payload: number;

  constructor(payload: number) {
     this.payload = payload;
  }
}