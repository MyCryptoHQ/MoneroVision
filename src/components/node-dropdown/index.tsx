import * as React from 'react';
import './node-dropdown.scss';
import { OutsideAlerter } from 'components/outside-click';
import { Select } from './components/select-node';
import { ConfigureNode } from '../modals/configure-node';
import { AddNode } from 'components/modals/add-node';
import { Node } from 'redux/nodes/actions';

interface State {
  isDropdownOpen: boolean;
  isConfigModalOpen: boolean;
  isAddNodeModalOpen: boolean;
  configureNode: Node;
}

export class NodeDropdown extends React.Component<{}, State> {
  public state = {
    isDropdownOpen: false,
    isConfigModalOpen: false,
    isAddNodeModalOpen: false,
    configureNode: { name: '', url: '' }
  };
  public openButton: any;
  constructor(props: any) {
    super(props);
    // React v16.3 createRef() API, until @types/react have updated cast as 'any'
    this.openButton = (React as any).createRef();
  }

  public toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  public toggleConfig = () => {
    this.setState({ isConfigModalOpen: !this.state.isConfigModalOpen });
  };

  public toggleAddNode = () => {
    this.setState({ isAddNodeModalOpen: !this.state.isAddNodeModalOpen });
  };

  public selectConfigureNode = (node: Node) => {
    this.setState({ configureNode: node });
  };

  public addNode = () => {
    this.toggleDropdown();
    this.toggleAddNode();
  };

  public render() {
    const {
      toggleDropdown,
      toggleConfig,
      toggleAddNode,
      selectConfigureNode,
      addNode,
      state: { isDropdownOpen, isConfigModalOpen, isAddNodeModalOpen, configureNode },
      openButton
    } = this;

    return (
      <div className="Select-node">
        <button className="Select-node-button" onClick={toggleDropdown} ref={this.openButton}>
          Nodes <i className="nc-icon nc-small-triangle-down" />
        </button>
        {isDropdownOpen && (
          <OutsideAlerter onClick={toggleDropdown} exception={openButton.current}>
            <div className="Select-node-dropdown">
              <Select
                toggleModal={() => {
                  toggleConfig(), toggleDropdown();
                }}
                configureNode={selectConfigureNode}
              />
              <div className="flex-spacer" />
              <button className="Select-node-add" onClick={addNode}>
                Add
              </button>
            </div>
          </OutsideAlerter>
        )}
        <ConfigureNode
          node={configureNode}
          isOpen={isConfigModalOpen && !!configureNode}
          closeModal={toggleConfig}
        />
        <AddNode isOpen={isAddNodeModalOpen} closeModal={toggleAddNode} />
      </div>
    );
  }
}
