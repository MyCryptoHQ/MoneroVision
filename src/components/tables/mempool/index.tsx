import * as React from 'react'
import './mempool.scss'
import * as data from 'assets/json/transactions.json'
import { calculateAge, toKB } from 'utils/functions'
import { Link } from 'react-router-dom'

export const MemPool = () => {
	return (
		<div className="MemPool card">
			<div className="MemPool-header">
				<h2 className="MemPool-title">MemPool</h2>
				<div className="flex-spacer" />
				<button className="MemPool-refresh">
					<i className="nc-icon nc-ic_refresh_24px" />
				</button>
				<button className="MemPool-view-all">View All</button>
			</div>
			<table className="MemPool-table">
				<thead className="MemPool-table-head">
					<tr>
						<th>Transaction Hash</th>
						<th>Fee</th>
						<th>Size</th>
						<th>Age</th>
					</tr>
				</thead>
				<tbody className="MemPool-table-body">
					{(data as any).map((transaction: any, i: number) => {
						return i <= 5 ? (
							<tr key={transaction.tx_hash}>
								<td>
									<div className="truncate">
										<div className="truncated">
											<Link to={`/tx/${transaction.tx_hash}`}>{transaction.tx_hash}</Link>
										</div>
									</div>
								</td>
								<td>{(transaction.tx_fee / 1000000000000).toFixed(3)}</td>
								<td>{toKB(transaction.tx_size)}</td>
								<td>{calculateAge(transaction.timestamp_utc + ' GMT')}</td>
							</tr>
						) : null
					})}
				</tbody>
			</table>
		</div>
	)
}
