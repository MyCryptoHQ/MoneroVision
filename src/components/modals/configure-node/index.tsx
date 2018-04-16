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

interface State {
  node: {
    name: string;
    url: string;
  };
  nameError: string;
  urlError: string;
  index: number;
}

interface OwnProps extends Omit<ModalProps, 'title' | 'buttons'> {
  node: Node | null;
}

interface DispatchProps {
  editNode: EditNodeType;
  removeNode: RemoveNodeType;
  selectNode: SelectNodeType;
}

type Props = OwnProps & NodeState & DispatchProps;

class ConfigureNodeClass extends React.Component<Props, State> {
  public state = {
    node: {
      name: '',
      url: ''
    },
    nameError: '',
    urlError: '',
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

  public setInputErrors = () => {
    const { name, url } = this.state.node;
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
      this.setState({ urlError: '' });
    }
  };

  public resetInputs() {
    const { name, url } = this.props.node as Node;
    this.setState({ node: { name, url } });
  }

  public closeModal = () => {
    this.setState({ nameError: '' });
    this.setState({ urlError: '' });
    this.resetInputs();
    this.props.closeModal();
  };

  public onComplete = () => {
    const { name, url } = this.state.node;
    this.setInputErrors();
    if (name.length > 0 && url.length > 0) {
      this.closeModal();
    }
  };

  public render() {
    const { node, index, nameError, urlError } = this.state;
    const buttons: Button[] = [
      {
        text: 'Confirm',
        type: 'primary',
        onClick: () => {
          this.props.editNode(index, node);
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
          this.props.removeNode(index);
          this.props.selectNode('Default');
          this.closeModal();
        }
      }
    ];
    return (
      <Modal
        {...this.props}
        buttons={buttons}
        className="Configure-Node"
        contentLabel="Configure Node"
        title="Configure Node"
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
          type="text"
          label="URL"
          required={true}
          error={urlError}
          placeholder="https://example.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.onChange('url', e.target.value)
          }
          value={!!node ? node.url : ''}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedNode: state.nodes.selectedNode,
    nodes: state.nodes.nodes
  };
};

export const ConfigureNode = connect(mapStateToProps, { editNode, removeNode, selectNode })(
  ConfigureNodeClass
);
