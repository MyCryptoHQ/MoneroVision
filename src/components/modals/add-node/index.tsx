import * as React from 'react';
import './add-node.scss';
import { Modal, Props as ModalProps, Button } from 'components/modals';
import { Input } from 'components/forms/input';
import { Omit } from 'utils/types';
import { connect } from 'react-redux';
import { addNode, AddNodeType } from 'redux/nodes/actions';
import { AppState } from 'redux/root-reducer';
import { closeModal, CloseModalType } from 'redux/modals/actions';
import * as ValidUrl from 'valid-url';
import { fetchAsync } from 'utils/functions';

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
  pending: boolean;
}

class AddNodeClass extends React.Component<Props, State> {
  public state = {
    name: '',
    url: '',
    nameError: '',
    urlError: '',
    pending: false
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
    const { name, url, urlError, pending } = this.state;

    this.validateForm();
    if (name.length > 0 && url.length > 0 && urlError.length === 0 && !pending) {
      this.props.addNode({ name, url });
      this.closeModal();
    }
  };

  public validateForm = () => {
    this.checkInputLength();
    this.validateURL(true);
  };

  public validateURL = (validateAPI = false) => {
    if (this.state.url.length > 0) {
      if (ValidUrl.isWebUri(this.state.url)) {
        if (validateAPI) {
          this.setState({ pending: true });
          const url = `${this.state.url}/mempool?limit=${1}&page=${0}`;
          fetchAsync(url)
            .then(() => {
              this.setState({ pending: false });

              this.setInputError('url', '');
            })
            .catch(error => {
              console.log(error);
              this.setState({ pending: false });

              this.setInputError(
                'url',
                'Unable to connect to node. Make sure your node is configured properly.'
              );
            });
        } else {
          this.setInputError('url', '');
        }
      } else {
        this.setInputError('url', 'A valid url is required');
      }
    }
  };

  public checkInputLength = () => {
    const { name, url } = this.state;
    if (name.length < 1) {
      this.setInputError('name', 'A name is required');
    } else {
      this.setInputError('name', '');
    }

    if (url.length < 1) {
      this.setInputError('url', 'A url is required');
    } else {
      this.setInputError('url', '');
    }
  };

  public setInputError = (input: 'name' | 'url', msg: string) => {
    this.setState({ [(input + 'Error') as any]: msg });
  };

  public render() {
    const { open } = this.props;
    const { name, nameError, url, urlError, pending } = this.state;
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
          className={pending ? 'pending' : ''}
          type="text"
          label="URL"
          inlinelabel={pending ? 'Connecting to node...' : ''}
          required={true}
          error={urlError}
          placeholder="https://api.example.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.onChange('url', e.target.value)
          }
          onBlur={() => {
            this.validateURL(true);
          }}
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
