import * as React from 'react'

interface Node {
	name: string
}

interface Props {
	toggleModal(): void
	toggleDropdown(): void
}

interface State {
	selectedNode: string
	nodes: Node[]
}

export class SelectNode extends React.Component<Props, State> {
	public state = {
		selectedNode: 'Default',
		nodes: [{ name: 'Default' }, { name: 'Infura' }],
	}

	public selectNode = (e: any) => {
		e.preventDefault()
		this.setState({ selectedNode: e.currentTarget.getAttribute('data-node') })
		Array.from(e.currentTarget.parentNode.childNodes, (node: any) => {
			return node.classList.remove('selected')
		})
		e.currentTarget.classList.add('selected')
	}

	public openModal = () => {
		this.props.toggleModal()
		this.props.toggleDropdown()
	}

	public render() {
		const { state: { nodes, selectedNode }, selectNode, openModal } = this
		return (
			<ul className="Select-node-nodes">
				{nodes.map(node => {
					return (
						<div
							className={`Select-node-node ${selectedNode === node.name ? 'selected' : ''}`}
							key={node.name}
							onClick={selectNode}
							data-node={node.name}
						>
							<div className="selected-marker" />
							<button className="settings" onClick={openModal}>
								<i className="nc-icon nc-ic_settings_24px" />
							</button>
							<div className="flex-spacer" />
							<p>{node.name}</p>
						</div>
					)
				})}
			</ul>
		)
	}
}
