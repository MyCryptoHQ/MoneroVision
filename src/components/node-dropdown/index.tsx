import * as React from 'react'
import './node-dropdown.scss'
import { OutsideAlerter } from 'components/outside-click'
import { SelectNode } from './components'
import { ConfigureNode } from '../modals/configure-node'
import { AddNode } from 'components/modals/add-node'
import { connect } from 'react-redux'
import { Node } from 'redux/nodes/actions'

interface State {
	isDropdownOpen: boolean
	isSettingsModalOpen: boolean
	isAddNodeModalOpen: boolean
	configureNode: Node | null
}

interface DispatchProps {}

type Props = DispatchProps

class NodeDropdownClass extends React.Component<Props, State> {
	constructor(props: any) {
		super(props)
		// React v16.3 createRef() API, until @types/react have updated cast as 'any'
		this.openButton = (React as any).createRef()
	}
	public state = {
		isDropdownOpen: false,
		isSettingsModalOpen: false,
		isAddNodeModalOpen: false,
		configureNode: null,
	}

	public openButton: any

	public toggleDropdown = () => {
		this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
	}

	public toggleSettings = () => {
		this.setState({ isSettingsModalOpen: !this.state.isSettingsModalOpen })
	}

	public toggleAddNode = () => {
		this.setState({ isAddNodeModalOpen: !this.state.isAddNodeModalOpen })
	}

	public selectConfigureNode = (node: Node) => {
		this.setState({ configureNode: node })
	}

	public addNode = () => {
		this.toggleDropdown()
		this.toggleAddNode()
	}

	public render() {
		const {
			toggleDropdown,
			toggleSettings,
			toggleAddNode,
			selectConfigureNode,
			addNode,
			state: { isDropdownOpen, isSettingsModalOpen, isAddNodeModalOpen, configureNode },
			openButton,
		} = this

		return (
			<div className="Select-node">
				<button className="Select-node-button" onClick={toggleDropdown} ref={this.openButton}>
					Nodes <i className="nc-icon nc-small-triangle-down" />
				</button>
				{isDropdownOpen && (
					<OutsideAlerter onClick={toggleDropdown} exception={openButton.current}>
						<div className="Select-node-dropdown">
							<SelectNode
								toggleModal={toggleSettings}
								toggleDropdown={toggleDropdown}
								configureNode={selectConfigureNode}
							/>
							<div className="flex-spacer" />
							<button className="Select-node-add" onClick={addNode}>
								Add
							</button>
						</div>
					</OutsideAlerter>
				)}
				<ConfigureNode
					node={configureNode}
					isOpen={isSettingsModalOpen && !!configureNode}
					closeModal={toggleSettings}
				/>
				<AddNode isOpen={isAddNodeModalOpen} closeModal={toggleAddNode} />
			</div>
		)
	}
}

export const NodeDropdown = connect(null, {})(NodeDropdownClass)
