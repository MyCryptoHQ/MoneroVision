import * as React from 'react'
import * as ReactModal from 'react-modal'
import './modal.scss'

interface Button {
	text: string
	type: 'primary' | 'secondary' | 'warning'
	onClick(): void
}

const Button: React.StatelessComponent<Button> = ({ text, type, onClick }) => (
	<button className={`Modal-button ${type}`} onClick={onClick}>
		{text}
	</button>
)

export interface Props extends ReactModal.Props {
	title: string
	closeModal(): void
	onComplete(): void
	buttons?: Button | Button[]
}

interface State {
	[name: string]: any
}

export class Modal extends React.Component<Props, State> {
	private appElement = document.getElementById('root') as HTMLElement
	public render() {
		const { title, closeModal, onComplete, buttons, children } = this.props

		const defaultButtons: Button[] = [
			{ text: 'Confirm', type: 'primary', onClick: onComplete },
			{ text: 'Cancel', type: 'secondary', onClick: closeModal },
		]

		return (
			<ReactModal
				{...this.props}
				className={`Modal ${this.props.className}`}
				appElement={this.appElement}
				overlayClassName="Modal-overlay"
				shouldCloseOnOverlayClick={false}
				onRequestClose={closeModal}
			>
				<div className="Modal-heading">
					<h2 className="Modal-title">{title}</h2>
					<div className="flex-spacer" />
					<button className="Modal-close" onClick={closeModal}>
						<i className="nc-icon nc-ic_close_24px" />
					</button>
				</div>
				<div className="Modal-body">{children}</div>
				<div className="Modal-footer">
					{!!buttons ? (
						Array.isArray(buttons) ? (
							buttons.map(button => <Button key={button.text} {...button} />)
						) : (
							<Button {...buttons} />
						)
					) : (
						defaultButtons.map(button => <Button key={button.text} {...button} />)
					)}
				</div>
			</ReactModal>
		)
	}
}
