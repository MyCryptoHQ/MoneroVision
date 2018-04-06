import * as React from 'react'

// Because a button cannot have a button as a child, NodeOptions are divs, with event listeners added to minic the a11y attributes of a native HTML button tag
export class NodeOption extends React.Component<any> {
	constructor(props: any) {
		super(props)
		// React v16.3 createRef() API, until @types/react have updated cast as 'any'
		this.nodeOption = (React as any).createRef()
	}

	nodeOption: any

	AddA11yEventLiseners = (e: KeyboardEvent) => {
		e.keyCode === 13 ? this.props.onClick(e) : e.keyCode === 32 ? this.props.onClick(e) : null
	}

	public componentDidMount() {
		this.nodeOption.current.addEventListener('keypress', this.AddA11yEventLiseners)
	}

	public componentWillUnmount() {
		this.nodeOption.current.removeEventListener('keypress', this.AddA11yEventLiseners)
	}

	public render() {
		const { children } = this.props
		return (
			<div {...this.props} role="button" tabIndex={0} ref={this.nodeOption}>
				{children}
			</div>
		)
	}
}
