import * as React from 'react';
import './line-graph.scss';
import * as moment from 'moment';

export type Point = [number, number, number];

interface Props {
  id: string;
  data: Point[];
  width?: number;
  height?: number;
}

interface State {
  hoverLocation: number | null;
  closestPoint: Point | null;
  path: string;
  area: string;
}

export class LineGraph extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    width: 300,
    height: 150
  };

  public state = {
    hoverLocation: null,
    closestPoint: null,
    path: '',
    area: ''
  };

  public svg: any;

  constructor(props: any) {
    super(props);
    // React v16.3 createRef() API, until @types/react have updated cast as 'any'
    this.svg = (React as any).createRef();
  }

  public componentWillUpdate(_: Props, prevState: State) {
    const prevPath = prevState.path;
    const newPath = this.state.path;
    const prevArea = this.state.area;
    const newArea = this.state.area;
    if (prevPath !== newPath || prevArea !== newArea) {
      // TODO: figure out how to animate path morph
    }
  }

  public getX = () => {
    const { data } = this.props;
    return {
      min: data[0][0],
      max: data[data.length - 1][0]
    };
  };
  public getY = () => {
    const { data, height } = this.props;
    // (+/- svgHeight! * 0.015) is appended to add a bit of padding to the graph
    return {
      min: data.reduce((min, p) => (p[1] < min ? p[1] : min), data[0][1]) - height! * 0.025,
      max: data.reduce((max, p) => (p[1] > max ? p[1] : max), data[0][1]) + height! * 0.025
    };
  };

  public getSvgX = (x: number) => {
    const { width } = this.props;
    const X = this.getX();
    return x / X.max * width!;
  };
  public getSvgY = (y: number) => {
    const { height } = this.props;
    const Y = this.getY();
    return (height! * Y.max - height! * y) / (Y.max - Y.min);
  };

  public makePath = () => {
    const { data } = this.props;
    let d = 'M ' + this.getSvgX(data[0][0]) + ' ' + this.getSvgY(data[0][1]) + ' ';
    d += data
      .map(point => 'L ' + this.getSvgX(point[0]) + ' ' + this.getSvgY(point[1]) + ' ')
      .join('');

    if (this.state.path !== d) {
      this.setState({ path: d });
    }

    return <path id="path" className="linechart-path" d={d} />;
  };

  public makeArea = () => {
    const { data } = this.props;
    let d = 'M ' + this.getSvgX(data[0][0]) + ' ' + this.getSvgY(data[0][1]) + ' ';
    d += data
      .map(point => 'L ' + this.getSvgX(point[0]) + ' ' + this.getSvgY(point[1]) + ' ')
      .join('');

    const x = this.getX();
    const y = this.getY();
    d +=
      'L ' +
      this.getSvgX(x.max) +
      ' ' +
      this.getSvgY(y.min) +
      ' ' +
      'L ' +
      this.getSvgX(x.min) +
      ' ' +
      this.getSvgY(y.min) +
      ' ';

    if (this.state.area !== d) {
      this.setState({ area: d });
    }

    return <path id="area" className="linechart-area" d={d} style={{ fill: 'url(#Gradient)' }} />;
  };

  public getCoords = (e: any) => {
    const { id, width, data } = this.props;
    const svgLocation = document.getElementById(id)!.getBoundingClientRect();
    const adjustment = (svgLocation.width - width!) / 2; //takes padding into consideration
    const hoverLocation = e.clientX - svgLocation.left - adjustment;
    const dataToWidthRatio = data.length / width!;
    const closestPoint = data[Math.round(hoverLocation * dataToWidthRatio)];

    this.setState({
      hoverLocation,
      closestPoint
    });
  };

  public makeLine = (hoverLocation: number) => {
    const { height } = this.props;
    return (
      <line className="linechart-line" x1={hoverLocation} y1={0} x2={hoverLocation} y2={height} />
    );
  };

  public makeActivePoint = (closestPoint: Point, hoverLocation: number) => (
    <circle
      className="linechart-point"
      r="4"
      cx={hoverLocation}
      cy={this.getSvgY(closestPoint[1])}
    />
  );

  public getDate = (point: Point) => {
    return moment(point[2]).format('MMM DD, LT');
  };

  public render() {
    const { width, height, id } = this.props;
    const { hoverLocation, closestPoint } = this.state;

    return (
      <div className="linechart">
        {closestPoint && (
          <>
            <div
              className="linechart-tooltip top"
              style={{ transform: `translateX(calc(${hoverLocation + 'px'} - 50%))` }}
            >
              <p>
                {(closestPoint as Point)[1].toLocaleString('us-EN', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
            </div>
            <div
              className="linechart-tooltip bottom"
              style={{
                transform: `translate(calc(${hoverLocation + 'px'} - 50%), 50%)`,
                bottom: `${0 - height! * 0.025}`
              }}
            >
              <p>{this.getDate(closestPoint)}</p>
            </div>
          </>
        )}
        <svg
          id={id}
          className="linechart-svg"
          ref={this.svg}
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
          {this.makePath()}
          {this.makeArea()}
          {hoverLocation ? this.makeLine(hoverLocation) : null}
          {closestPoint && hoverLocation ? this.makeActivePoint(closestPoint, hoverLocation) : null}
        </svg>
      </div>
    );
  }
}
