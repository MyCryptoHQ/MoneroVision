import * as React from 'react'
import './blocks.scss'
import * as data from 'assets/json/blocks.json'
import { calculateAge, toKB } from 'utils/functions'
import { Link } from 'react-router-dom'

export const Blocks = () => {
	return (
		<div className="Blocks card">
			<div className="Blocks-header">
				<h2 className="Blocks-title">Blocks</h2>
				<div className="flex-spacer" />
				<button className="Blocks-refresh">
					<i className="nc-icon nc-ic_refresh_24px" />
				</button>
				<button className="Blocks-view-all">View All</button>
			</div>
			<table className="Blocks-table">
				<thead className="Blocks-table-head">
					<tr>
						<th>Height</th>
						<th>Block Hash</th>
						<th>Txs</th>
						<th>Size</th>
						<th>Age</th>
					</tr>
				</thead>
				<tbody className="Blocks-table-body">
					{(data as any).map((block: any, i: number) => {
						return i <= 5 ? (
							<tr key={block.hash}>
								<td>
									<Link to={`block/${block.height}`}>{block.height}</Link>
								</td>
								<td>
									<div className="truncate">
										<div className="truncated">
											<Link to={`block/${block.hash}`}>{block.hash}</Link>
										</div>
									</div>
								</td>
								<td>{block.txs.length}</td>
								<td>{toKB(block.size)}</td>
								<td>{calculateAge(block.timestamp_utc + ' UTC')}</td>
							</tr>
						) : null
					})}
				</tbody>
			</table>
		</div>
	)
}
