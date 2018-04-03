import * as React from 'react'
import './nav.scss'
import { NodeDropdown } from 'components/node-dropdown'
import { SearchInput } from 'components/search-input'
import { NavLink } from 'react-router-dom'

export const Nav = () => (
	<nav className="Navigation">
		<div className="Navigation-wrapper">
			<NavLink to="/" className="Navigation-title">
				Monero Explorer
			</NavLink>
			<div className="flex-spacer" />
			<SearchInput />
			<div className="flex-spacer" />
			<NodeDropdown />
		</div>
	</nav>
)
