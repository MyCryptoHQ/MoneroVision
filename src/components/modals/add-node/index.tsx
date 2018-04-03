import * as React from 'react'
import './add-node.scss'
import { Modal, Props as ModalProps } from 'components/modals'
import { Input } from 'components/forms/input'
import { Omit } from 'utils/types'

type Props = Omit<ModalProps, 'title'>

interface State {
	name: string
	url: string
}

export class AddNode extends React.Component<Props, State> {
	public state = {
		name: '',
		url: '',
	}

	public onChange = (key: string, value: string) => {
		this.setState({ ...this.state, [key]: value })
	}

	public render() {
		const { name, url } = this.state
		return (
			<Modal {...this.props} className="Add-Node" contentLabel="Add Node" title="Add Node">
				<div className="Modal-info">
					<i className="nc-icon nc-ic_info_24px" />
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu ligula varius, interdum nibh in.</p>
				</div>
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
