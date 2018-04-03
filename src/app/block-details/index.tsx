import * as React from 'react'
import './block-details.scss'

export const BlockDetails = ({ match }: any) => {
	console.log(match)
	return <div>Block: {match.params.block}</div>
}
