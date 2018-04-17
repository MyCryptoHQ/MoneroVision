import { TypeKeys } from './constants';

type Modal = 'add_node' | 'config_node';

export interface ModalAction {
  type: TypeKeys.OPEN_MODAL | TypeKeys.CLOSE_MODAL;
  payload: Modal;
}

export type OpenModalType = typeof openModal;
export const openModal = (modal: Modal): ModalAction => {
  return {
    type: TypeKeys.OPEN_MODAL,
    payload: modal
  };
};

export type CloseModalType = typeof closeModal;
export const closeModal = (modal: Modal): ModalAction => {
  return {
    type: TypeKeys.CLOSE_MODAL,
    payload: modal
  };
};

export interface ConfigureNodeAction {
  type: TypeKeys.CONFIGURE_NODE;
  payload: number;
}
export type ConfigureNodeType = typeof configureNode;
export const configureNode = (index: number): ConfigureNodeAction => {
  return {
    type: TypeKeys.CONFIGURE_NODE,
    payload: index
  };
};
