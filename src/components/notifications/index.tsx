import * as React from 'react';
import './notifications.scss';
import { removeNotification, RemoveNotificationType } from 'redux/notifications/actions';
import { connect } from 'react-redux';
import { AppState } from 'redux/root-reducer';
import { NotificationState } from 'redux/notifications/reducer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface StateProps {
  notifications: NotificationState;
}

interface DispatchProps {
  removeNotification: RemoveNotificationType;
}

type Props = StateProps & DispatchProps;

class NotificationsClass extends React.Component<Props> {
  public render() {
    const { notifications } = this.props;
    return (
      <div className="Notification-wrapper">
        <TransitionGroup>
          {notifications.map(({ text, type }, index) => {
            setTimeout(() => {
              this.props.removeNotification(index);
            }, 4000);
            return (
              <CSSTransition key={index} classNames="Notification-animation" timeout={200}>
                <p className="Notification">
                  {!!type && <span className={type}>{type}</span>}
                  {text}
                </p>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    notifications: state.notifications
  };
};

export const Notifications = connect(mapStateToProps, { removeNotification })(NotificationsClass);
