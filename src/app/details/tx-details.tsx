import * as React from 'react';
import './details.scss';
import { formatApiDateStrings, toKB, fetchAsync } from 'utils/functions';
import { connect } from 'react-redux';
import { AppState } from 'redux/root-reducer';
import { NodeState } from 'redux/nodes/reducer';
import { RouteComponentProps } from 'react-router';
import { Node } from 'redux/nodes/actions';
import { minutesUntilMined } from 'utils/heuristic';
import { Link } from 'react-router-dom';
import { DetailsSkeleton } from './skeleton-details';
import { Tag } from 'components/tag';

type Props = NodeState & RouteComponentProps<{ transaction: string }>;

interface State {
  data: {
    transaction: any;
    pending: boolean;
    confirmationDuration: number | null;
  };
}

export class TxDetailsClass extends React.Component<Props, State> {
  public state = {
    data: { transaction: null, pending: false, confirmationDuration: null }
  };

  public componentWillMount() {
    this.setState({ data: { ...this.state.data, pending: true } });
    this.setConfirmationDuration();
    this.fetchTransaction();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchTransaction();
    }
  }

  public setConfirmationDuration = () => {
    const { selectedNode, nodes } = this.props;
    const node = nodes.find(n => n.name === selectedNode) as Node;
    const txHash = this.props.match.params.transaction;
    let mempool: any[];
    let blocks: any[];
    const getMempool = fetchAsync(`${node.url}/mempool?limit=${10000}&page=${0}`).then(
      json => (mempool = json.data.txs)
    );
    const getBlocks = fetchAsync(`${node.url}/transactions?limit=${100}&page=${0}`).then(
      json => (blocks = json.data.blocks)
    );

    Promise.all([getMempool, getBlocks])
      .then(() => minutesUntilMined(txHash, mempool, blocks))
      .then(duration =>
        this.setState({ data: { ...this.state.data, confirmationDuration: duration } })
      );
  };

  public fetchTransaction = () => {
    const { nodes, selectedNode } = this.props;
    const node = nodes.find(n => n.name === selectedNode) as Node;

    this.setState({ data: { ...this.state.data, pending: true } });
    fetch(node.url + '/transaction/' + this.props.match.params.transaction)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.setState({ data: { ...this.state.data, pending: false } });
        throw new Error('error fetching mempool');
      })
      .then(json => {
        this.setState({ data: { ...this.state.data, transaction: json.data, pending: false } });
      })
      .catch(error => {
        console.log(error);
      });
  };

  public render() {
    const transaction = this.state.data.transaction as any;
    return (
      <div className="Details card">
        {!!transaction ? (
          <>
            <div className="Details-header">
              <h1 className="Details-header-title">Transaction Details</h1>
              <div className="flex-spacer" />

              {!transaction.block_height ? (
                this.state.data.confirmationDuration ? (
                  <Tag type="pending" text={`PENDING ~ ${this.state.data.confirmationDuration}m`} />
                ) : (
                  <Tag className="skeleton" type="pending" text="PENDING ~ 2m" />
                )
              ) : transaction.coinbase ? (
                <Tag type="coinbase" text="COINBASE" />
              ) : null}
              <div className="Details-header-timestamp">
                {formatApiDateStrings(transaction.timestamp)}
              </div>
            </div>
            <div className="Details-body">
              <div className="Details-body-section">
                <p className="Details-body-section-title">Transaction</p>
                <div className="Details-body-section-content">
                  <div className="Details-body-section-content-input hash">
                    <p>Hash</p>
                    <p>{transaction.tx_hash}</p>
                  </div>
                  <div className="Details-body-section-content-input extra">
                    <p>Extra</p>
                    <p>{transaction.extra}</p>
                  </div>
                  <br />
                  {(transaction.payment_id || transaction.payment_id8) && (
                    <>
                      <div className="Details-body-section-content-input">
                        <p>Payment ID</p>
                        <p>{transaction.payment_id || transaction.payment_id8}</p>
                      </div>
                      <br />
                    </>
                  )}
                  <div className="Details-body-section-content-input">
                    <p>Fee</p>
                    <p>{(transaction.tx_fee / 1000000000000).toFixed(3)} / kB</p>
                  </div>
                </div>
              </div>
              {!!transaction.block_height && (
                <div className="Details-body-section">
                  <p className="Details-body-section-title">Block</p>
                  <div className="Details-body-section-content">
                    <div className="Details-body-section-content-input">
                      <p>Confirmations</p>
                      <p>{transaction.current_height - transaction.block_height}</p>
                    </div>
                    <div className="Details-body-section-content-input">
                      <p>Block Height</p>
                      <Link to={`/block/${transaction.block_height}`}>
                        {transaction.block_height}
                      </Link>
                    </div>
                    <div className="Details-body-section-content-input">
                      <p>Current Height</p>
                      <Link to={`/block/${transaction.current_height - 1}`}>
                        {transaction.current_height - 1}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
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
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.inputs.map((input: any) => {
                        return (
                          <tr key={Math.random()}>
                            <td className="">{input.key_image}</td>
                            {transaction.tx_version === 1 && <td>{input.amount}</td>}
                          </tr>
                        );
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
                      {!!transaction.outputs[0].amount && <th>Amount</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.outputs.map((output: any) => {
                      return (
                        <tr key={Math.random()}>
                          <td>
                            <div className="wrap">{output.public_key}</div>
                          </td>
                          {!!output.amount && <td>{output.amount}</td>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <DetailsSkeleton type="tx" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedNode: state.nodes.selectedNode,
    nodes: state.nodes.nodes
  };
};

export const TxDetails = connect(mapStateToProps)(TxDetailsClass);
