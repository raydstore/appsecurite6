import { PRINTACCIDENT, PRINTMARK, PrintParams, ActionPrintCard, PRINTCARD } from './../action/printcard.action';
import { PrintAccidentAction } from '../action/printcard.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PrintCard {
  params: PrintParams;
}

let initialeState = {
  params: {
    viewname: '',
    id: 0,
    showcard: false
  }
}

export function printCardReducer(state = initialeState, action: ActionPrintCard) {
  switch(action.type) {
    case PRINTACCIDENT: return { params: action.payload }
    case PRINTMARK:     return { params: action.payload }
    case PRINTCARD:     return { params: action.payload }
    default: return state;
  }
}

let printCardFS = createFeatureSelector<PrintCard>('printcard');
export let viewnameSelector = createSelector(printCardFS, state => state.params.viewname) ;
export let idSelector       = createSelector(printCardFS, state => state.params.id) ;
export let showcardSelector = createSelector(printCardFS, state => state.params.showcard) ;
export let paramsSelector   = createSelector(printCardFS, state => state.params) ;