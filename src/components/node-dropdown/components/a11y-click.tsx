import * as React from 'react'

interface Props {
	tabIndex?: number
}

// Because a button cannot have a button as a child, NodeOptions are divs, with event listeners added to minic the a11y attributes of a native HTML button tag
export class A11yClick extends React.Component<Props & any> {
	static defaultProps = {
		tabIndex: -1,
	}
	constructor(props: any) {
		super(props)
		// React v16.3 createRef() API, until @types/react have updated cast as 'any'
		this.node = (React as any).createRef()
	}

	node: any

	AddA11yEventLiseners = (e: KeyboardEvent) => {
		e.keyCode === 13 ? this.props.onClick(e) : e.keyCode === 32 ? this.props.onClick(e) : null
	}

	public componentDidMount() {
		this.node.current.addEventListener('keypress', this.AddA11yEventLiseners)
	}

	public componentWillUnmount() {
		this.node.current.removeEventListener('keypress', this.AddA11yEventLiseners)
	}

	public render() {
		const { children } = this.props
		return (
			<div {...this.props} className="a11y-click-wrapper" role="button" tabIndex={this.props.tabIndex} ref={this.node}>
				{children}
			</div>
		)
	}
}
