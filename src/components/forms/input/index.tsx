import * as React from 'react'
import './input.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export class Input extends React.Component<Props> {
	public render() {
		return (
			<label className="Input">
				<span className="Input-label">{this.props.label}</span>
				<input className="Input-input" {...this.props} />
			</label>
		)
	}
}
