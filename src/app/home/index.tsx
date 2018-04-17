import * as React from 'react';
import './home.scss';
import { MemPool } from 'components/tables/mempool';
import { Blocks } from 'components/tables/blocks';
import { MoneroGraph } from 'components/line-graph/xmr';

export class Home extends React.Component {
  public state = {
    width: 400,
    height: 100
  };

  public componentWillMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  public updateDimensions = () => {
    const clientWidth = document.documentElement.clientWidth;
    // take rem into account when adjusting width for padding
    const width =
      clientWidth < 900 ? (clientWidth > 600 ? clientWidth - 32 : clientWidth - 26) : 400;
    const height = clientWidth > 600 && clientWidth < 900 ? 150 : 100;
    // adjust for border width
    this.setState({ width: width - 2, height });
  };

  public render() {
    const { width, height } = this.state;
    return (
      <>
        <section className="card New-User-CTA">
          <div className="New-User-CTA-text-wrapper">
            <h2 className="New-User-CTA-title">New to Monero?</h2>
            <p className="New-User-CTA-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book.
            </p>
            {/* <div className="flex-spacer" /> */}
            <div className="New-User-CTA-link-wrapper">
              <a href="/" className="New-User-CTA-link">
                Learn More
              </a>
            </div>
          </div>
          <MoneroGraph width={width} height={height} />
        </section>
        <MemPool />
        <Blocks />
      </>
    );
  }
}
