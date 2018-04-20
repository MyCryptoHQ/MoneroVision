import { TypeKeys } from './constants';

export interface Notification {
  text: string;
  type?: 'Error' | 'Complete';
}

export interface AddNotificationAction {
  type: TypeKeys.ADD_NOTIFICATION;
  payload: Notification;
}
export type AddNotificationType = typeof addNotification;
export const addNotification = (notification: Notification): AddNotificationAction => {
  return {
    type: TypeKeys.ADD_NOTIFICATION,
    payload: notification
  };
};

export interface RemoveNotificationAction {
  type: TypeKeys.REMOVE_NOTIFICATION;
  payload: number;
}
export type RemoveNotificationType = typeof removeNotification;
export const removeNotification = (index: number): RemoveNotificationAction => {
  return {
    type: TypeKeys.REMOVE_NOTIFICATION,
    payload: index
  };
};
