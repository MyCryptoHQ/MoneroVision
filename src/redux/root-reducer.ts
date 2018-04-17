import { nodeReducer, NodeState } from './nodes/reducer';
import { modalReducer, ModalState } from './modals/reducer';
import { combineReducers } from 'redux';

export interface AppState {
  nodes: NodeState;
  modals: ModalState;
}

export const rootReducer = combineReducers<AppState>({
  nodes: nodeReducer,
  modals: modalReducer
});
