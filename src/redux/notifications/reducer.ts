import { createReducer } from 'utils/functions';
import { TypeKeys } from './constants';
import { Notification, AddNotificationAction, RemoveNotificationAction } from './actions';

export type NotificationState = Notification[];

export const INITIAL_STATE: NotificationState = [];

function addNotification(
  state: NotificationState,
  action: AddNotificationAction
): NotificationState {
  return [...state, action.payload];
}

function removeNotification(
  state: NotificationState,
  action: RemoveNotificationAction
): NotificationState {
  return [...state.filter((_, i) => i !== action.payload)];
}

export const notificationReducer = createReducer(INITIAL_STATE, {
  [TypeKeys.ADD_NOTIFICATION]: addNotification,
  [TypeKeys.REMOVE_NOTIFICATION]: removeNotification
});
