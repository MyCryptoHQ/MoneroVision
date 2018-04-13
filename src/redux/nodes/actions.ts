import { TypeKeys } from './constants';

export interface Node {
  name: string;
  url: string;
}

export interface AddNodeAction {
  type: TypeKeys.ADD_NODE;
  payload: Node;
}
export type AddNodeType = typeof addNode;
export const addNode = (node: Node): AddNodeAction => {
  return {
    type: TypeKeys.ADD_NODE,
    payload: node
  };
};

export interface SelectNodeAction {
  type: TypeKeys.SELECT_NODE;
  payload: string;
}
export type SelectNodeType = typeof selectNode;
export const selectNode = (name: string): SelectNodeAction => {
  return {
    type: TypeKeys.SELECT_NODE,
    payload: name
  };
};

export interface EditNodeAction {
  type: TypeKeys.EDIT_NODE;
  payload: { index: number; node: Node };
}
export type EditNodeType = typeof editNode;
export const editNode = (index: number, node: Node): EditNodeAction => {
  return {
    type: TypeKeys.EDIT_NODE,
    payload: { index, node }
  };
};

export interface RemoveNodeAction {
  type: TypeKeys.REMOVE_NODE;
  payload: Node;
}
export type RemoveNodeType = typeof removeNode;
export const removeNode = (node: Node): RemoveNodeAction => {
  return {
    type: TypeKeys.REMOVE_NODE,
    payload: node
  };
};
