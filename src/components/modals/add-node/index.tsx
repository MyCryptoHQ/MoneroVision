import * as React from 'react';
import './add-node.scss';
import { Modal, Props as ModalProps, Button } from 'components/modals';
import { Input } from 'components/forms/input';
import { Omit } from 'utils/types';
import { connect } from 'react-redux';
import { addNode, AddNodeType, Node } from 'redux/nodes/actions';
import { AppState } from 'redux/root-reducer';
import { closeModal, CloseModalType } from 'redux/modals/actions';
import * as ValidUrl from 'valid-url';
import { fetchAsync } from 'utils/functions';

type OwnProps = Omit<ModalProps, 'title' | 'buttons' | 'isOpen'>;

interface StateProps {
  open: boolean;
  nodes: Node[];
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

    this.validateName();
    this.validateURL();
    if (name.length > 0 && url.length > 0 && urlError.length === 0 && !pending) {
      this.props.addNode({ name, url });
      this.closeModal();
    }
  };

  public validateName = () => {
    const { nodes } = this.props;
    const { name } = this.state;
    if (name.length > 0) {
      if (!!nodes.filter(n => n.name === name).length) {
        this.setInputError('name', 'A node with that name already exists');
      } else {
        this.setInputError('name', '');
      }
    } else {
      this.setInputError('name', 'A name is required');
    }
  };

  public validateURL = () => {
    const { nodes } = this.props;
    const { url } = this.state;
    if (url.length > 0) {
      if (!!nodes.filter(n => n.url === url).length) {
        this.setInputError('url', 'A node with that url already exists');
      } else {
        if (ValidUrl.isWebUri(url)) {
          this.setState({ pending: true });
          fetchAsync(`${url}/api/mempool?limit=${1}&page=${0}`)
            .then(() => {
              this.setState({ pending: false });
              this.setInputError('url', '');
            })
            .catch(error => {
              console.log(error);
              this.setState({ pending: false });
              this.setInputError(
                'url',
                'Unable to connect to node. Make sure the node is configured properly.'
              );
            });
        } else {
          this.setInputError('url', 'A valid url is required');
        }
      }
    } else {
      this.setInputError('url', 'A url is required');
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
          onBlur={this.validateName}
          value={name}
        />
        <Input
          className={pending ? 'pending' : ''}
          type="text"
          label="URL"
          // inlinelabel={pending ? 'Connecting to node...' : ''}
          required={true}
          error={urlError}
          placeholder="https://monero.mycryptoapi.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.onChange('url', e.target.value)
          }
          onBlur={this.validateURL}
          value={url}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    open: state.modals.add_node.open,
    nodes: state.nodes.nodes
  };
};

export const AddNode = connect(
  mapStateToProps,
  { addNode, closeModal }
)(AddNodeClass);
