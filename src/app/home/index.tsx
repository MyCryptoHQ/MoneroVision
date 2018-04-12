import * as React from 'react'
import './home.scss'
import { MemPool } from 'components/tables/mempool'
import { Blocks } from 'components/tables/blocks'
import { MoneroGraph } from 'components/line-graph/xmr'

export const Home = () => (
	<>
		<section className="card New-User-CTA">
			<div className="New-User-CTA-text-wrapper">
				<h2 className="New-User-CTA-title">New to Monero?</h2>
				<p className="New-User-CTA-text">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard
					dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
					specimen book.
				</p>
				<div className="New-User-CTA-link-wrapper">
					<a href="/" className="New-User-CTA-link">
						Learn More
					</a>
				</div>
			</div>
			<MoneroGraph width={400} height={150} />
		</section>
		<MemPool />
		<Blocks />
	</>
)
