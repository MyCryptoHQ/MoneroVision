import * as React from 'react'
import './tx-details.scss'
import * as data from 'assets/json/transactions.json'
import { formatApiDateStrings, toKB } from 'utils/functions'

const exampleInputs = [
	{ key_image: '8913f4133d8f5e627739160b28f6cb282425e05d14bc3893e3c57abbd37c6e06', amount: '112', mixins: '11' },
	{ key_image: '19cae597b93df72718904a49f8e9a16a7d64dc169444146b4343418b740ead5e', amount: '1982', mixins: '11' },
]

const exampleOutputs = [
	{
		public_key: '75dd34c7554ac82dd85fc9ab38e71bf8c1ff72d42c21652e0558bf13dbbda6ed',
		amount: '1242',
	},
]

export const TxDetails = ({ match }: any) => {
	const transaction = (data as any).find((obj: any) => obj.tx_hash === match.params.transaction)
	const payment_id = transaction.payment_id || transaction.payment_id8
	return (
		<section className="Details card">
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
							<p>Transaction Hash</p>
							<p>{transaction.tx_hash}</p>
						</div>
						<div className="Details-body-section-content-input">
							<p>Extra</p>
							<p>{transaction.extra}</p>
						</div>
						{payment_id && (
							<div className="Details-body-section-content-input">
								<p>Payment ID</p>
								<p>{payment_id}</p>
							</div>
						)}
						<div className="Details-body-section-content-input">
							<p>Fee</p>
							<p>{transaction.tx_fee}</p>
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
				<div className="Details-body-section">
					<p className="Details-body-section-title">Inputs</p>
					<table className="Details-body-section-table Details-body-section-content">
						<thead>
							<tr>
								<th>Key Image</th>
								<th>Amount</th>
								<th>Mixin</th>
							</tr>
						</thead>
						<tbody>
							{exampleInputs.map((input, i) => {
								return (
									<tr key={i}>
										<td>{input.key_image}</td>
										<td>{input.amount}</td>
										<td>{input.mixins}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
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
							{exampleOutputs.map((input, i) => {
								return (
									<tr key={i}>
										<td>{input.public_key}</td>
										<td>{input.amount}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}
