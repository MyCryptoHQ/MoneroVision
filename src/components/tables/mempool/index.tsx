import * as React from 'react'
import './mempool.scss'
import { calculateAge, toKB } from 'utils/functions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from 'redux/root-reducer'
import { NodeState } from 'redux/nodes/reducer'
import { Node } from 'redux/nodes/actions'

class MemPoolClass extends React.Component<NodeState, any> {
	public state = {
		data: { total: null, transactions: [], pending: false },
	}

	public componentDidMount() {
		this.fetchData()
	}

	public fetchData = () => {
		const { nodes, selectedNode } = this.props
		const node = nodes.find(node => node.name === selectedNode) as Node

		this.setState({ data: { ...this.state.data, pending: true } })
		fetch(node.url + '/api/mempool?limit=5')
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				this.setState({ data: { ...this.state.data, pending: false } })
				throw new Error('error fetching mempool')
			})
			.then(json => {
				const { txs_no, txs } = json.data
				this.setState({ data: { total: txs_no, transactions: txs, pending: false } })
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { data } = this.state
		return (
			<div className="MemPool card">
				<div className="MemPool-header">
					<h2 className="MemPool-title">MemPool</h2> <span className="MemPool-title"> ({data.total})</span>
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
						{data.transactions.map((transaction: any) => (
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
								<td>{calculateAge(transaction.timestamp_utc + ' UTC')}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		selectedNode: state.nodes.selectedNode,
		nodes: state.nodes.nodes,
	}
}

export const MemPool = connect(mapStateToProps)(MemPoolClass)
