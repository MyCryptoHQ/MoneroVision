import * as React from 'react';
import { connect } from 'react-redux';
import {
  Node,
  removeNode,
  RemoveNodeType,
  editNode,
  EditNodeType,
  selectNode,
  SelectNodeType
} from 'redux/nodes/actions';
import { AppState } from 'redux/root-reducer';
import { NodeState as StateProps } from 'redux/nodes/reducer';
import { A11yClick } from './a11y-click';

interface OwnProps {
  toggleModal(): void;
  configureNode(node: Node): void;
}

interface DispatchProps {
  editNode: EditNodeType;
  selectNode: SelectNodeType;
  removeNode: RemoveNodeType;
}

type Props = OwnProps & StateProps & DispatchProps;

class SelectClass extends React.Component<Props> {
  public select = (e: any) => {
    e.preventDefault();
    this.props.selectNode(e.target.getAttribute('data-node'));
    Array.from(e.target.parentNode.childNodes, (node: Element) => {
      return node.classList.remove('selected');
    });
    e.target.classList.add('selected');
  };

  public openModal = (e: React.MouseEvent<HTMLButtonElement>, node: Node) => {
    e.stopPropagation();
    this.props.configureNode(node);
    this.props.toggleModal();
  };

  public render() {
    const { nodes, selectedNode } = this.props;
    return (
      <ul className="Select-node-nodes">
        {nodes.map(node => {
          return (
            <A11yClick key={Math.random()} onClick={this.select}>
              <div
                className={`Select-node-node ${selectedNode === node.name ? 'selected' : ''}`}
                data-node={node.name}
                tabIndex={0}
              >
                <div className="selected-marker" />
                {node.name !== 'Default' && (
                  <A11yClick onClick={(e: any) => this.openModal(e, node)}>
                    <button className="settings">
                      <i className="nc-icon nc-ic_settings_24px" />
                    </button>
                  </A11yClick>
                )}
                <div className="flex-spacer" />
                <p>{node.name}</p>
              </div>
            </A11yClick>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    selectedNode: state.nodes.selectedNode,
    nodes: state.nodes.nodes
  };
};

export const Select = connect(mapStateToProps, { editNode, selectNode, removeNode })(SelectClass);
