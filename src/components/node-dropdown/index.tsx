import * as React from 'react'
import './node-dropdown.scss'
import { OutsideAlerter } from 'components/outside-click'
import { SelectNode } from './components'
import { ConfigureNode } from '../modals/configure-node'
import { AddNode } from 'components/modals/add-node'

interface State {
	isDropdownOpen: boolean
	isSettingsModalOpen: boolean
	isAddNodeModalOpen: boolean
}

export class NodeDropdown extends React.Component<{}, State> {
	constructor(props: any) {
		super(props)
		// React v16.3 createRef() API, until @types/react have updated cast as 'any'
		this.openButton = (React as any).createRef()
	}
	public state = {
		isDropdownOpen: false,
		isSettingsModalOpen: false,
		isAddNodeModalOpen: false,
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

	public render() {
		const {
			toggleDropdown,
			toggleSettings,
			toggleAddNode,
			state: { isDropdownOpen, isSettingsModalOpen, isAddNodeModalOpen },
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
							<SelectNode toggleModal={toggleSettings} toggleDropdown={toggleDropdown} />
							<div className="flex-spacer" />
							<button
								className="Select-node-add"
								onClick={() => {
									toggleDropdown()
									toggleAddNode()
								}}
							>
								Add
							</button>
						</div>
					</OutsideAlerter>
				)}
				<ConfigureNode isOpen={isSettingsModalOpen} closeModal={toggleSettings} onComplete={toggleSettings} />
				<AddNode isOpen={isAddNodeModalOpen} closeModal={toggleAddNode} onComplete={toggleAddNode} />
			</div>
		)
	}
}
