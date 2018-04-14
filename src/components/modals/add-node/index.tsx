import * as React from 'react';
import './add-node.scss';
import { Modal, Props as ModalProps, Button } from 'components/modals';
import { Input } from 'components/forms/input';
import { Omit } from 'utils/types';
import { connect } from 'react-redux';
import { addNode, AddNodeType } from 'redux/nodes/actions';

type OwnProps = Omit<ModalProps, 'title' | 'buttons'>;

interface DispatchProps {
  addNode: AddNodeType;
}

type Props = OwnProps & DispatchProps;

interface State {
  name: string;
  url: string;
}

class AddNodeClass extends React.Component<Props, State> {
  public state = {
    name: '',
    url: ''
  };

  public resetInputs() {
    this.setState({ name: '', url: '' });
  }

  public onChange = (key: string, value: string) => {
    this.setState({ ...this.state, [key]: value });
  };

  public onComplete = () => {
    const { name, url } = this.state;
    this.props.addNode({ name, url });
    this.props.closeModal();
  };

  public render() {
    const { name, url } = this.state;
    const buttons: Button[] = [
      {
        text: 'Confirm',
        type: 'primary',
        onClick: () => {
          this.onComplete();
          this.resetInputs();
        }
      },
      {
        text: 'Cancel',
        type: 'secondary',
        onClick: () => {
          this.props.closeModal();
          this.resetInputs();
        }
      }
    ];
    return (
      <Modal
        {...this.props}
        buttons={buttons}
        className="Add-Node"
        contentLabel="Add Node"
        title="Add Node"
      >
        {/* <div className="Modal-info">
					<i className="nc-icon nc-ic_info_24px" />
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu ligula varius, interdum nibh in.</p>
				</div> */}
        <Input
          type="text"
          label="Name"
          placeholder="Custom Node"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.onChange('name', e.target.value)
          }
          value={name}
        />
        <Input
          type="text"
          label="URL"
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

export const AddNode = connect(null, { addNode })(AddNodeClass);
