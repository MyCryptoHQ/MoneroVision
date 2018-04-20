import { nodeReducer, NodeState } from './nodes/reducer';
import { modalReducer, ModalState } from './modals/reducer';
import { notificationReducer, NotificationState } from './notifications/reducer';
import { combineReducers } from 'redux';

export interface AppState {
  nodes: NodeState;
  modals: ModalState;
  notifications: NotificationState;
}

export const rootReducer = combineReducers<AppState>({
  nodes: nodeReducer,
  modals: modalReducer,
  notifications: notificationReducer
});
