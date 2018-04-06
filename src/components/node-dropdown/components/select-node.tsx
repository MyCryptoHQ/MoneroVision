import * as React from 'react'
import { NodeOption } from './node'
import { connect } from 'react-redux'
import {
	Node,
	removeNode,
	RemoveNodeType,
	editNode,
	EditNodeType,
	selectNode,
	SelectNodeType,
} from 'redux/nodes/actions'
import { AppState } from 'redux/root-reducer'
import { NodeState as StateProps } from 'redux/nodes/reducer'

interface OwnProps {
	toggleModal(): void
	toggleDropdown(): void
	configureNode(node: Node): void
}

interface DispatchProps {
	editNode: EditNodeType
	selectNode: SelectNodeType
	removeNode: RemoveNodeType
}

type Props = OwnProps & StateProps & DispatchProps

class SelectNodeClass extends React.Component<Props> {
	public selectNode = (e: any) => {
		e.preventDefault()
		this.setState({ selectedNode: e.target.getAttribute('data-node') })
		Array.from(e.target.parentNode.childNodes, (node: Element) => {
			return node.classList.remove('selected')
		})
		e.target.classList.add('selected')
	}

	public openModal = (node: Node) => {
		this.props.configureNode(node)
		this.props.toggleModal()
		this.props.toggleDropdown()
	}

	public render() {
		const { selectNode } = this
		const { nodes, selectedNode } = this.props
		return (
			<ul className="Select-node-nodes">
				{nodes.map(node => {
					return (
						<NodeOption
							className={`Select-node-node ${selectedNode === node.name ? 'selected' : ''}`}
							key={node.name}
							onClick={selectNode}
							data-node={node.name}
						>
							<div className="selected-marker" />
							<button className="settings" onClick={() => this.openModal(node)}>
								<i className="nc-icon nc-ic_settings_24px" />
							</button>
							<div className="flex-spacer" />
							<p>{node.name}</p>
						</NodeOption>
					)
				})}
			</ul>
		)
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		selectedNode: state.nodes.selectedNode,
		nodes: state.nodes.nodes,
	}
}

export const SelectNode = connect(mapStateToProps, { editNode, selectNode, removeNode })(SelectNodeClass)
