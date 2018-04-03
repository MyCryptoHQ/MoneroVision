import * as React from 'react'
import './tx-details.scss'

export const TxDetails = ({ match }: any) => {
	return <div>Tx Hash: {match.params.transaction}</div>
}
