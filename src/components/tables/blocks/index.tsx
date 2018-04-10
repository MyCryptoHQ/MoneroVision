import * as React from 'react'
import '../table.scss'
import { calculateAge, toKB, fetchAsync } from 'utils/functions'
import { Link } from 'react-router-dom'
import { AppState } from 'redux/root-reducer'
import { connect } from 'react-redux'
import { NodeState } from 'redux/nodes/reducer'
import { Node } from 'redux/nodes/actions'
import { RouteComponentProps } from 'react-router'

// URLSearchParams API Polyfill: https://github.com/WebReflection/url-search-params
if ('searchParams' in HTMLAnchorElement.prototype) {
	require('url-search-params')
}

interface OwnProps {
	paginated?: boolean
	history?: RouteComponentProps<any>['history']
	location?: RouteComponentProps<any>['location']
}

type Props = OwnProps & NodeState

type State = {
	data: { current_height: number; blocks: any[]; pending: boolean }
	limit: number
	page: number
}

class BlocksClass extends React.Component<Props, State> {
	public state = {
		data: { current_height: 0, blocks: [], pending: false },
		limit: this.props.paginated ? 25 : 5,
		page: 0,
	}

	public componentWillMount() {
		if (this.props.location) {
			const queryStr = new URLSearchParams(this.props.location.search)
			let queries: any = {}
			for (var pair of queryStr.entries()) {
				queries[pair[0]] = pair[1]
			}
			if (queries.page) {
				this.setState({
					...this.state,
					page: queries.page,
				})
			}

			if (queries.limit) {
				this.setState({
					...this.state,
					limit: queries.limit,
				})
			}
		}
	}

	public componentDidMount() {
		this.fetchData()
	}

	public componentDidUpdate(_prevProps: Props, prevState: State) {
		if (prevState.page !== this.state.page && !this.state.data.pending) {
			this.fetchData()
		}
	}

	public fetchData = () => {
		const { limit, page } = this.state
		const { nodes, selectedNode } = this.props
		const node = nodes.find(node => node.name === selectedNode) as Node
		this.setState({ data: { ...this.state.data, pending: true } })

		fetchAsync(node.url + `/api/transactions?limit=${limit}&page=${page}`)
			.then(json => {
				const { current_height, blocks, page } = json.data
				this.setState({ data: { current_height, blocks, pending: false }, page })
			})
			.catch(error => {
				console.log(error.message)
			})
	}

	public incrementPage = () => {
		this.setState({ page: this.state.page + 1 })
		if (this.props.history) {
			this.props.history.push({
				pathname: 'blocks',
				search: 'page=' + (this.state.page + 1),
			})
		}
	}

	public decrementPage = () => {
		if (this.state.page > 0) {
			this.setState({ page: this.state.page - 1 })
			if (this.props.history) {
				this.props.history.push({
					pathname: 'blocks',
					search: 'page=' + (this.state.page - 1),
				})
			}
		}
	}

	render() {
		const { paginated } = this.props
		const { data: { blocks, current_height, pending }, limit, page } = this.state
		return (
			<div className="Blocks card">
				<div className="Blocks-header">
					<h2 className="Blocks-title">Blocks</h2>
					<div className="flex-spacer" />
					<button className="Blocks-refresh" onClick={this.fetchData}>
						<i className="nc-icon nc-ic_refresh_24px" />
					</button>
					{!paginated && (
						<Link to="/blocks" className="Blocks-view-all">
							View All
						</Link>
					)}
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
				<div className="flex-spacer" />
				{!!paginated && (
					<div className="MemPool-table-footer">
						<div className="flex-spacer" />
						<p className="MemPool-table-footer-pages">
							{limit * page + 1}-{limit * page + blocks.length} of {current_height}
						</p>
						<button
							className="MemPool-table-footer-paginate"
							onClick={this.decrementPage}
							disabled={current_height <= limit || pending}
						>
							<i className="nc-icon nc-ic_keyboard_arrow_left_24px" />
						</button>
						<button
							className="MemPool-table-footer-paginate"
							onClick={this.incrementPage}
							disabled={current_height <= limit || pending}
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

export const Blocks = connect(mapStateToProps)(BlocksClass)
