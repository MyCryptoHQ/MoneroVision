import * as React from 'react'
import './search-input.scss'

export const SearchInput = () => (
	<input
		type="text"
		className="Search"
		placeholder="Search Transactions and Blocks"
		autoCorrect="off"
		autoCapitalize="off"
		spellCheck={false}
	/>
)
