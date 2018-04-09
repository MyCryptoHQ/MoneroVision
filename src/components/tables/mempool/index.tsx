import * as React from 'react'
import '../tables.scss'
import { calculateAge, toKB, fetchAsync } from 'utils/functions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from 'redux/root-reducer'
import { NodeState } from 'redux/nodes/reducer'
import { Node } from 'redux/nodes/actions'

interface OwnProps {
	paginated?: boolean
}

type Props = OwnProps & NodeState

class MemPoolClass extends React.Component<Props, any> {
	public state = {
		data: { txs_no: 0, txs: [], pending: false },
		limit: this.props.paginated ? 25 : 5,
		page: 0,
	}

	public componentDidMount() {
		this.fetchData()
	}

	public fetchData = async () => {
		const { limit, page } = this.state
		const { nodes, selectedNode } = this.props
		const node = nodes.find(node => node.name === selectedNode) as Node
		this.setState({ data: { ...this.state.data, pending: true } })
		fetchAsync(node.url + `/api/mempool?limit=${limit}&page=${page}`)
			.then(json => {
				const { txs_no, txs, page } = json.data
				this.setState({ data: { txs_no, txs, pending: false }, page })
			})
			.catch(error => {
				this.setState({ data: { ...this.state.data, pending: false } })
				console.log(error.message)
			})
	}

	public incrementPage = () => {
		this.setState({ page: this.state.page + 1 })
	}

	public decrementPage = () => {
		if (this.state.page > 0) {
			this.setState({ page: this.state.page - 1 })
		}
	}

	render() {
		const { paginated } = this.props
		const { data: { txs, txs_no, pending }, limit, page } = this.state
		return (
			<div className={`MemPool card ${paginated && 'paginated'}`}>
				<div className="MemPool-header">
					<h2 className="MemPool-title">MemPool</h2>{' '}
					{!paginated &&
						txs.length >= 5 && (
							<span className="MemPool-size">
								({txs.length} of {txs_no})
							</span>
						)}
					<div className="flex-spacer" />
					<button className="MemPool-refresh" onClick={this.fetchData}>
						<i className="nc-icon nc-ic_refresh_24px" />
					</button>
					{!paginated && (
						<Link to="/mempool" className="MemPool-view-all">
							View All
						</Link>
					)}
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
						{txs.map((transaction: any) => (
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
				<div className="flex-spacer" />
				{!!paginated && (
					<div className="MemPool-table-footer">
						<div className="flex-spacer" />
						<p className="MemPool-table-footer-pages">
							{limit * page + 1}-{limit * page + txs.length} of {txs_no}
						</p>
						<button
							className="MemPool-table-footer-paginate"
							onClick={this.fetchData}
							disabled={txs_no <= limit || pending}
						>
							<i className="nc-icon nc-ic_keyboard_arrow_left_24px" />
						</button>
						<button
							className="MemPool-table-footer-paginate"
							onClick={this.fetchData}
							disabled={txs_no <= limit || pending}
						>
							<i className="nc-icon nc-ic_keyboard_arrow_right_24px" />
						</button>
					</div>
				)}
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
