import * as React from 'react'
import './details.scss'
import { formatApiDateStrings, toKB } from 'utils/functions'
import { connect } from 'react-redux'
import { AppState } from 'redux/root-reducer'
import { NodeState } from 'redux/nodes/reducer'
import { RouteComponentProps } from 'react-router'
import { Node } from 'redux/nodes/actions'

type Props = NodeState & RouteComponentProps<{ transaction: string }>

interface State {
	data: {
		transaction: any
		pending: boolean
	}
}

export class TxDetailsClass extends React.Component<Props, State> {
	public state = {
		data: { transaction: null, pending: false },
	}

	public componentWillMount() {
		this.fetchTransaction()
	}

	public fetchTransaction = () => {
		const { nodes, selectedNode } = this.props
		const node = nodes.find(node => node.name === selectedNode) as Node

		this.setState({ data: { ...this.state.data, pending: true } })
		fetch(node.url + '/api/transaction/' + this.props.match.params.transaction)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				this.setState({ data: { ...this.state.data, pending: false } })
				throw new Error('error fetching mempool')
			})
			.then(json => {
				this.setState({ data: { transaction: json.data, pending: false } })
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const transaction = this.state.data.transaction as any
		return (
			<div className="Details card">
				{!!transaction ? (
					<>
						<div className="Details-header">
							<h1 className="Details-header-title">Transaction Details</h1>
							<div className="flex-spacer" />
							<p className="Details-header-timestamp">{formatApiDateStrings(transaction.timestamp_utc)}</p>
						</div>
						<div className="Details-body">
							<div className="Details-body-section">
								<p className="Details-body-section-title">Transaction</p>
								<div className="Details-body-section-content">
									<div className="Details-body-section-content-input">
										<p>Hash</p>
										<p>{transaction.tx_hash}</p>
									</div>
									<div className="Details-body-section-content-input">
										<p>Extra</p>
										<p>{transaction.extra}</p>
									</div>
									{(transaction.payment_id || transaction.payment_id8) && (
										<>
											<br />
											<div className="Details-body-section-content-input">
												<p>Payment ID</p>
												<p>{transaction.payment_id || transaction.payment_id8}</p>
											</div>
										</>
									)}
									<br />
									<div className="Details-body-section-content-input">
										<p>Fee</p>
										<p>{(transaction.tx_fee / 1000000000000).toFixed(3)}</p>
									</div>
								</div>
							</div>
							<div className="Details-body-section">
								<p className="Details-body-section-title">Misc</p>
								<div className="Details-body-section-content">
									<div className="Details-body-section-content-input">
										<p>Size</p>
										<p>{toKB(transaction.tx_size)}</p>
									</div>
									<div className="Details-body-section-content-input">
										<p>Mixin</p>
										<p>{transaction.mixin}</p>
									</div>
									<div className="Details-body-section-content-input">
										<p>Transaction Version</p>
										<p>{transaction.tx_version}</p>
									</div>
								</div>
							</div>
							{!!transaction.inputs && (
								<div className="Details-body-section">
									<p className="Details-body-section-title">Inputs</p>
									<table className="Details-body-section-table Details-body-section-content">
										<thead>
											<tr>
												<th>Key Image</th>
												{transaction.tx_version === 1 && <th>Amount</th>}
												<th>Mixin</th>
											</tr>
										</thead>
										<tbody>
											{transaction.inputs.map((input: any, i: number) => {
												return (
													<tr key={i}>
														<td>{input.key_image}</td>
														{transaction.tx_version === 1 && <td>{input.amount}</td>}
														<td>{input.mixins.length}</td>
													</tr>
												)
											})}
										</tbody>
									</table>
								</div>
							)}
							<div className="Details-body-section">
								<p className="Details-body-section-title">Outputs</p>
								<table className="Details-body-section-table Details-body-section-content">
									<thead>
										<tr>
											<th>Public Key</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>
										{transaction.outputs.map((output: any, i: number) => {
											return (
												<tr key={i}>
													<td>{output.public_key}</td>
													<td>{output.amount}</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					</>
				) : (
					<div>transaction doesn't exist</div>
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

export const TxDetails = connect(mapStateToProps)(TxDetailsClass)
