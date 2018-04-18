import * as React from 'react';
import './configure-node.scss';
import { Modal, Props as ModalProps, Button } from 'components/modals';
import { Input } from 'components/forms/input';
import { Omit } from 'utils/types';
import { connect } from 'react-redux';
import {
  Node,
  editNode,
  removeNode,
  RemoveNodeType,
  EditNodeType,
  selectNode,
  SelectNodeType
} from 'redux/nodes/actions';
import { AppState } from 'redux/root-reducer';
import { NodeState } from 'redux/nodes/reducer';
import { closeModal, CloseModalType, configureNode, ConfigureNodeType } from 'redux/modals/actions';
import * as ValidUrl from 'valid-url';
import { fetchAsync } from 'utils/functions';

interface State {
  node: {
    name: string;
    url: string;
  };
  nameError: string;
  urlError: string;
  pending: boolean;
  validUrl: boolean | null;
  index: number;
}

type OwnProps = Omit<ModalProps, 'title' | 'buttons' | 'isOpen'>;

interface StateProps extends NodeState {
  open: boolean;
  node: Node;
}

interface DispatchProps {
  editNode: EditNodeType;
  removeNode: RemoveNodeType;
  selectNode: SelectNodeType;
  closeModal: CloseModalType;
  configureNode: ConfigureNodeType;
}

type Props = OwnProps & StateProps & DispatchProps;

class ConfigureNodeClass extends React.Component<Props, State> {
  public state = {
    node: {
      name: '',
      url: ''
    },
    nameError: '',
    urlError: '',
    pending: false,
    validUrl: null,
    index: -1
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.node !== this.props.node) {
      const index = this.props.nodes.indexOf(this.props.node as Node);
      const { name, url } = this.props.node as Node;
      this.setState({ node: { name, url }, index });
    }
  }

  public onChange = (key: string, value: string) => {
    this.setState({ ...this.state, node: { ...this.state.node, [key]: value } });
  };

  public validateForm = () => {
    this.checkInputLength();
    this.validateURL(true);
  };

  public validateURL = (validateAPI = false) => {
    this.setState({ validUrl: false });
    if (this.state.node.url.length > 0) {
      if (ValidUrl.isWebUri(this.state.node.url)) {
        if (!validateAPI) {
          this.setInputError('url', '');
        }
        if (validateAPI && !this.state.validUrl) {
          this.setState({ pending: true });
          const url = `${this.state.node.url}/mempool?limit=${1}&page=${0}`;
          fetchAsync(url)
            .then(() => {
              this.setState({ pending: false });
              this.setState({ validUrl: true });
              this.setInputError('url', '');
            })
            .catch(error => {
              console.log(error);
              this.setState({ pending: false });
              this.setState({ validUrl: false });
              this.setInputError(
                'url',
                'Unable to connect to node. Make sure your node is configured properly.'
              );
            });
        }
      } else {
        this.setInputError('url', 'A valid url is required');
      }
    }
  };

  public checkInputLength = () => {
    const { name, url } = this.state.node;
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

  public resetInputs() {
    const { name, url } = this.props.node as Node;
    this.setState({ node: { name, url } });
  }

  public closeModal = () => {
    this.setState({ nameError: '' });
    this.setState({ urlError: '' });
    this.resetInputs();
    this.props.closeModal('config_node');
  };

  public onComplete = () => {
    const { index, node, urlError, pending } = this.state;
    const { name, url } = this.state.node;

    this.validateForm();
    if (name.length > 0 && url.length > 0 && urlError.length === 0 && !pending) {
      this.props.editNode(index, node);
      this.closeModal();
    }
  };

  public render() {
    const { open } = this.props;
    const { node, index, nameError, urlError, pending } = this.state;
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
      },
      {
        text: 'Delete Node',
        type: 'secondary',
        className: 'delete-node',
        onClick: () => {
          this.props.configureNode(0);
          this.props.removeNode(index);
          this.props.selectNode('Default');
          this.closeModal();
        }
      }
    ];
    return (
      <Modal
        isOpen={open}
        buttons={buttons}
        className="Configure-Node"
        contentLabel="Configure Node"
        title="Configure Node"
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
          value={!!node ? node.name : ''}
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
          value={!!node ? node.url : ''}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedNode: state.nodes.selectedNode,
    nodes: state.nodes.nodes,
    open: state.modals.config_node.open,
    node: state.nodes.nodes[state.modals.config_node.config_node]
  };
};

export const ConfigureNode = connect(mapStateToProps, {
  editNode,
  removeNode,
  selectNode,
  closeModal,
  configureNode
})(ConfigureNodeClass);
