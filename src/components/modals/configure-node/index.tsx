import * as React from 'react'
import './configure-node.scss'
import { Modal, Props as ModalProps, Button } from 'components/modals'
import { Input } from 'components/forms/input'
import { Omit } from 'utils/types'
import { connect } from 'react-redux'
import { Node, editNode, removeNode, RemoveNodeType, EditNodeType } from 'redux/nodes/actions'

interface State {
	name: string
	url: string
}

interface OwnProps extends Omit<ModalProps, 'title' | 'buttons'> {
	node: Node | null
}

interface DispatchProps {
	editNode: EditNodeType
	removeNode: RemoveNodeType
}

type Props = OwnProps & DispatchProps

class ConfigureNodeClass extends React.Component<Props, State> {
	public onChange = (key: string, value: string) => {
		this.setState({ ...this.state, [key]: value })
	}

	public onComplete = () => {
		this.props.closeModal()
	}

	public render() {
		const { node } = this.props
		const buttons: Button[] = [
			{
				text: 'Confirm',
				type: 'primary',
				onClick: () => {
					this.onComplete()
					// this.resetInputs()
				},
			},
			{
				text: 'Cancel',
				type: 'secondary',
				onClick: () => {
					this.props.closeModal()
					// this.resetInputs()
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

export const ConfigureNode = connect(null, { editNode, removeNode })(ConfigureNodeClass)
