import * as React from 'react'
import './line-graph.scss'
import * as moment from 'moment'

export type Point = [number, number, number]

interface Props {
	id: string
	data: Point[]
	width?: number
	height?: number
}

interface State {
	hoverLocation: number | null
	closestPoint: Point | null
}

export class LineGraph extends React.Component<Props, State> {
	static defaultProps: Partial<Props> = {
		width: 300,
		height: 150,
	}

	state = {
		hoverLocation: null,
		closestPoint: null,
	}

	getX = () => {
		const { data } = this.props
		return {
			min: data[0][0],
			max: data[data.length - 1][0],
		}
	}
	getY = () => {
		const { data, height } = this.props
		// (+/- svgHeight! * 0.015) is appended to add a bit of padding to the graph
		return {
			min: data.reduce((min, p) => (p[1] < min ? p[1] : min), data[0][1]) - height! * 0.025,
			max: data.reduce((max, p) => (p[1] > max ? p[1] : max), data[0][1]) + height! * 0.025,
		}
	}

	getSvgX = (x: number) => {
		const { width } = this.props
		const X = this.getX()
		return x / X.max * width!
	}
	getSvgY = (y: number) => {
		const { height } = this.props
		const Y = this.getY()
		return (height! * Y.max - height! * y) / (Y.max - Y.min)
	}

	line = (pointA: Point, pointB: Point) => {
		const lengthX = pointB[0] - pointA[0]
		const lengthY = pointB[1] - pointA[1]
		return {
			length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
			angle: Math.atan2(lengthY, lengthX),
		}
	}

	controlPoint = (current: Point, previous: Point, next: Point, reverse?: boolean) => {
		// When 'current' is the first or last point of the array
		// 'previous' or 'next' don't exist.
		// Replace with 'current'
		const p = previous || current
		const n = next || current
		// The smoothing ratio
		const smoothing = 0.2
		// Properties of the opposed-line
		const o = this.line(p, n)
		// If is end-control-point, add PI to the angle to go backward
		const angle = o.angle + (reverse ? Math.PI : 0)
		const length = o.length * smoothing
		// The control point position is relative to the current point
		const x = current[0] + Math.cos(angle) * length
		const y = current[1] + Math.sin(angle) * length
		return [x, y]
	}

	bezierCommand = (point: Point, i: number, data: Point[]) => {
		// start control point
		const [cpsX, cpsY] = this.controlPoint(data[i - 1], data[i - 2], point)
		// end control point
		const [cpeX, cpeY] = this.controlPoint(point, data[i - 1], data[i + 1], true)
		return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
	}

	makeAxis = () => {
		const X = this.getX()
		const Y = this.getY()

		return (
			<g className="linechart-axis">
				<line x1={this.getSvgX(X.min)} y1={this.getSvgY(Y.min)} x2={this.getSvgX(X.max)} y2={this.getSvgY(Y.min)} />
				<line x1={this.getSvgX(X.min)} y1={this.getSvgY(Y.min)} x2={this.getSvgX(X.min)} y2={this.getSvgY(Y.max)} />
			</g>
		)
	}

	makePath = () => {
		const { data } = this.props
		let pathD = 'M ' + this.getSvgX(data[0][0]) + ' ' + this.getSvgY(data[0][1]) + ' '
		pathD += data.map((point: Point) => {
			const x = this.getSvgX(point[0])
			const y = this.getSvgY(point[1])
			return 'L ' + x + ' ' + y + ' '
		})

		return <path className="linechart-path" d={pathD} />
	}

	makeArea = () => {
		const { data } = this.props
		let pathD = 'M ' + this.getSvgX(data[0][0]) + ' ' + this.getSvgY(data[0][1]) + ' '

		pathD += data
			.map(point => {
				return 'L ' + this.getSvgX(point[0]) + ' ' + this.getSvgY(point[1]) + ' '
			})
			.join('')

		const x = this.getX()
		const y = this.getY()
		pathD +=
			'L ' +
			this.getSvgX(x.max) +
			' ' +
			this.getSvgY(y.min) +
			' ' +
			'L ' +
			this.getSvgX(x.min) +
			' ' +
			this.getSvgY(y.min) +
			' '

		return <path className="linechart-area" d={pathD} style={{ fill: 'url(#Gradient)' }} />
	}

	getCoords = (e: any) => {
		const { id, width, data } = this.props
		const svgLocation = document.getElementById(id)!.getBoundingClientRect()
		const adjustment = (svgLocation.width - width!) / 2 //takes padding into consideration
		const hoverLocation = e.clientX - svgLocation.left - adjustment
		const dataToWidthRatio = data.length / width!
		const closestPoint = data[Math.round(hoverLocation * dataToWidthRatio)]

		this.setState({
			hoverLocation,
			closestPoint,
		})
	}

	makeLine = (hoverLocation: number) => {
		const { height } = this.props
		return <line className="linechart-line" x1={hoverLocation} y1={0} x2={hoverLocation} y2={height} />
	}

	makeActivePoint = (closestPoint: Point, hoverLocation: number) => (
		<circle className="linechart-point" r="4" cx={hoverLocation} cy={this.getSvgY(closestPoint[1])} />
	)

	getDate = (point: Point) => {
		return moment(point[2]).format('MMM DD, LT')
	}

	render() {
		const { width, height, id } = this.props
		const { hoverLocation, closestPoint } = this.state

		return (
			<div className="linechart">
				{closestPoint && (
					<>
						<div
							className="linechart-tooltip top"
							style={{ transform: `translateX(calc(${hoverLocation + 'px'} - 50%))` }}
						>
							<p>{(closestPoint as Point)[1].toLocaleString('us-EN', { style: 'currency', currency: 'USD' })}</p>
						</div>
						<div
							className="linechart-tooltip bottom"
							style={{
								transform: `translate(calc(${hoverLocation + 'px'} - 50%), 50%)`,
								bottom: `${0 - height! * 0.025}`,
							}}
						>
							<p>{this.getDate(closestPoint)}</p>
						</div>
					</>
				)}
				<svg
					id={id}
					className="linechart-svg"
					viewBox={`0 0 ${width} ${height}`}
					width={width}
					height={height}
					onMouseMove={this.getCoords}
				>
					<defs>
						<linearGradient id="Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#77BDF7" stopOpacity={0.75} />
							<stop offset="100%" stopColor="#77BDF7" stopOpacity={0.25} />
						</linearGradient>
					</defs>
					{this.makeAxis()}
					{this.makePath()}
					{this.makeArea()}
					{hoverLocation ? this.makeLine(hoverLocation) : null}
					{closestPoint && hoverLocation ? this.makeActivePoint(closestPoint, hoverLocation) : null}
				</svg>
			</div>
		)
	}
}
