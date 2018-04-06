import * as React from 'react'
import './block-details.scss'

export const BlockDetails = ({ match }: any) => {
	return <div>Block: {match.params.block}</div>
}
