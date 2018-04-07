import * as React from 'react'
import './blocks.scss'
import { calculateAge, toKB } from 'utils/functions'
import { Link } from 'react-router-dom'
import { AppState } from 'redux/root-reducer'
import { connect } from 'react-redux'
import { NodeState } from 'redux/nodes/reducer'
import { Node } from 'redux/nodes/actions'

interface State {
	data: {
		blocks: any[]
		pending: boolean
	}
}

class BlocksClass extends React.Component<NodeState, State> {
	public state = {
		data: { blocks: [], pending: false },
	}

	public componentDidMount() {
		this.fetchData()
	}

	public fetchData = () => {
		const { nodes, selectedNode } = this.props
		const node = nodes.find(node => node.name === selectedNode) as Node

		this.setState({ data: { ...this.state.data, pending: true } })
		fetch(node.url + '/api/transactions?limit=5')
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				this.setState({ data: { ...this.state.data, pending: false } })
				throw new Error('error fetching mempool')
			})
			.then(json => {
				const { blocks } = json.data
				this.setState({ data: { blocks, pending: false } })
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { data: { blocks } } = this.state
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
						{blocks.map((block: any) => (
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

export const Blocks = connect(mapStateToProps)(BlocksClass)
