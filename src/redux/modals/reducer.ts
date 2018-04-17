import { createReducer } from 'utils/functions';
import { TypeKeys } from './constants';
import { ModalAction, ConfigureNodeAction } from './actions';

export interface ModalState {
  add_node: { open: boolean };
  config_node: { open: boolean; config_node: number };
}

export const INITIAL_STATE: ModalState = {
  add_node: { open: false },
  config_node: { open: false, config_node: -1 }
};

function openModal(state: ModalState, action: ModalAction): ModalState {
  return { ...state, [action.payload]: { ...state[action.payload], open: true } };
}
function closeModal(state: ModalState, action: ModalAction): ModalState {
  return { ...state, [action.payload]: { ...state[action.payload], open: false } };
}
function configureNode(state: ModalState, action: ConfigureNodeAction): ModalState {
  return { ...state, config_node: { ...state.config_node, config_node: action.payload } };
}

export const modalReducer = createReducer(INITIAL_STATE, {
  [TypeKeys.OPEN_MODAL]: openModal,
  [TypeKeys.CLOSE_MODAL]: closeModal,
  [TypeKeys.CONFIGURE_NODE]: configureNode
});
