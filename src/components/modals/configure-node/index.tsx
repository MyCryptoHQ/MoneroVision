import * as React from 'react'
import './configure-node.scss'
import { Modal, Props as ModalProps, Button } from 'components/modals'
import { Input } from 'components/forms/input'
import { Omit } from 'utils/types'
import { connect } from 'react-redux'
import { Node, editNode, removeNode, RemoveNodeType, EditNodeType } from 'redux/nodes/actions'
import { AppState } from 'redux/root-reducer'
import { NodeState } from 'redux/nodes/reducer'

interface State {
	node: {
		name: string
		url: string
	}
	index: number
}

interface OwnProps extends Omit<ModalProps, 'title' | 'buttons'> {
	node: Node | null
}

interface DispatchProps {
	editNode: EditNodeType
	removeNode: RemoveNodeType
}

type Props = OwnProps & NodeState & DispatchProps

class ConfigureNodeClass extends React.Component<Props, State> {
	public state = {
		node: {
			name: '',
			url: '',
		},
		index: -1,
	}

	public componentDidUpdate(prevProps: Props) {
		if (prevProps !== this.props) {
			const index = this.props.nodes.indexOf(this.props.node as Node)
			const { name, url } = this.props.node as Node
			this.setState({ node: { name, url }, index })
		}
	}

	public onChange = (key: string, value: string) => {
		this.setState({ ...this.state, node: { ...this.state.node, [key]: value } })
	}

	public onComplete = () => {
		this.props.closeModal()
	}

	public render() {
		const { node, index } = this.state
		const buttons: Button[] = [
			{
				text: 'Confirm',
				type: 'primary',
				onClick: () => {
					this.props.editNode(index, node)
					this.onComplete()
				},
			},
			{
				text: 'Cancel',
				type: 'secondary',
				onClick: () => {
					this.props.closeModal()
				},
			},
		]
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
					placeholder="Custom Node"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange('name', e.target.value)}
					value={!!node ? node.name : ''}
				/>
				<Input
					type="text"
					label="URL"
					placeholder="https://example.com"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange('url', e.target.value)}
					value={!!node ? node.url : ''}
				/>
			</Modal>
		)
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		selectedNode: state.nodes.selectedNode,
		nodes: state.nodes.nodes,
	}
}

export const ConfigureNode = connect(mapStateToProps, { editNode, removeNode })(ConfigureNodeClass)
