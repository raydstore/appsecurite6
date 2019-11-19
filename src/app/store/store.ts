import { PrintCard, printCardReducer } from "./reducer/printcard.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface StoreInterface {
  printcard: PrintCard;
}

/* export interface PrintCardAction {
  type: string,
  id: number
} */

export const reducerList: ActionReducerMap<StoreInterface> = {printcard: printCardReducer}
