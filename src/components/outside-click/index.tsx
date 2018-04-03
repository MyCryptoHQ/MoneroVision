import * as React from 'react'

interface Props {
	children: React.ReactNode
	onClick(): void
	exception?: Node
}

export class OutsideAlerter extends React.Component<Props> {
	constructor(props: any) {
		super(props)
		// React v16.3 createRef() API, until @types/react have updated cast as 'any'
		this.wrapperRef = (React as any).createRef()
	}

	public wrapperRef: any

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}

	handleClickOutside = (event: any) => {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target !== this.props.exception) {
			this.props.onClick()
		}
	}

	render() {
		return <div ref={this.wrapperRef}>{this.props.children}</div>
	}
}
