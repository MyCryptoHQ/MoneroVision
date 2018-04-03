import * as React from 'react'
import './configure-node.scss'
import { Modal, Props as ModalProps } from 'components/modals'
import { Input } from 'components/forms/input'
import { Omit } from 'utils/types'

interface State {
	name: string
	url: string
}

type Props = Omit<ModalProps, 'title'>

export class ConfigureNode extends React.Component<Props, State> {
	public state = {
		name: 'Default',
		url: 'https://example.com',
	}

	public onChange = (key: string, value: string) => {
		this.setState({ ...this.state, [key]: value })
	}

	public render() {
		const { name, url } = this.state
		return (
			<Modal {...this.props} className="Configure-Node" contentLabel="Configure Node" title="Configure Node">
				<Input
					type="text"
					label="Name"
					placeholder="Custom Node"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange('name', e.target.value)}
					value={name}
				/>
				<Input
					type="text"
					label="URL"
					placeholder="https://example.com"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange('url', e.target.value)}
					value={url}
				/>
			</Modal>
		)
	}
}
