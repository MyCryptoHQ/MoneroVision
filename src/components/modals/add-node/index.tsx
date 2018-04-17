import * as React from 'react';
import './add-node.scss';
import { Modal, Props as ModalProps, Button } from 'components/modals';
import { Input } from 'components/forms/input';
import { Omit } from 'utils/types';
import { connect } from 'react-redux';
import { addNode, AddNodeType } from 'redux/nodes/actions';
import { AppState } from 'redux/root-reducer';
import { closeModal, CloseModalType } from 'redux/modals/actions';

type OwnProps = Omit<ModalProps, 'title' | 'buttons' | 'isOpen'>;

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  addNode: AddNodeType;
  closeModal: CloseModalType;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  name: string;
  nameError: string;
  url: string;
  urlError: string;
}

class AddNodeClass extends React.Component<Props, State> {
  public state = {
    name: '',
    url: '',
    nameError: '',
    urlError: ''
  };

  public resetInputs() {
    this.setState({ name: '', url: '' });
  }

  public onChange = (key: string, value: string) => {
    this.setState({ ...this.state, [key]: value });
  };

  public closeModal = () => {
    this.setState({ nameError: '' });
    this.setState({ urlError: '' });
    this.resetInputs();
    this.props.closeModal('add_node');
  };

  public onComplete = () => {
    const { name, url } = this.state;

    this.setInputErrors();
    if (name.length > 0 && url.length > 0) {
      this.props.addNode({ name, url });
      this.closeModal();
    }
  };

  public setInputErrors = () => {
    const { name, url } = this.state;
    if (name.length < 1) {
      this.setState({ nameError: 'A name is required' });
    } else {
      this.setState({ nameError: '' });
    }

    if (url.length < 1) {
      this.setState({
        urlError: 'A url is required'
      });
    } else {
      this.setState({
        urlError: ''
      });
    }
  };

  public render() {
    const { open } = this.props;
    const { name, nameError, url, urlError } = this.state;
    const buttons: Button[] = [
      {
        text: 'Confirm',
        type: 'primary',
        onClick: () => {
          this.onComplete();
        }
      },
      {
        text: 'Cancel',
        type: 'secondary',
        onClick: () => {
          this.closeModal();
        }
      }
    ];
    return (
      <Modal
        isOpen={open}
        buttons={buttons}
        className="Add-Node"
        contentLabel="Add Node"
        title="Add Node"
        closeModal={this.closeModal}
      >
        <Input
          type="text"
          label="Name"
          required={true}
          error={nameError}
          placeholder="Custom Node"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.onChange('name', e.target.value)
          }
          value={name}
        />
        <Input
          type="text"
          label="URL"
          required={true}
          error={urlError}
          placeholder="https://example.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.onChange('url', e.target.value)
          }
          value={url}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    open: state.modals.add_node.open
  };
};

export const AddNode = connect(mapStateToProps, { addNode, closeModal })(AddNodeClass);
