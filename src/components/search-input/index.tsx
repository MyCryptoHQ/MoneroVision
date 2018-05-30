import * as React from 'react';
import './search-input.scss';
import { AppState } from 'redux/root-reducer';
import { connect } from 'react-redux';
import { NodeState } from 'redux/nodes/reducer';
import { fetchAsync } from 'utils/functions';
import { Node } from 'redux/nodes/actions';
import { withRouter, RouteComponentProps } from 'react-router';
import { addNotification, AddNotificationType } from 'redux/notifications/actions';

interface State {
  data: any;
  queryStr: string;
}

interface DispatchProps {
  addNotification: AddNotificationType;
}

type Props = NodeState & DispatchProps & RouteComponentProps<{}>;
class SearchInputClass extends React.Component<Props, State> {
  public state = {
    data: {},
    queryStr: ''
  };

  public node: any;
  constructor(props: any) {
    super(props);
    // React v16.3 createRef() API, until @types/react have updated cast as 'any'
    this.node = (React as any).createRef();
  }

  public onEnter = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.fetchData(this.state.queryStr);
    }
  };

  public componentDidMount() {
    this.node.current.addEventListener('keypress', this.onEnter);
  }

  public componentWillUnmount() {
    this.node.current.removeEventListener('keypress', this.onEnter);
  }

  public fetchData = async (queryStr: string) => {
    const { nodes, selectedNode } = this.props;
    const node = nodes.find(n => n.name === selectedNode) as Node;

    fetchAsync(node.url + `/api/search/${queryStr}`)
      .then(json => {
        if (json.status === 'success') {
          const location = !!json.data.tx_hash
            ? `/tx/${json.data.tx_hash}`
            : !!json.data.hash
              ? `/block/${json.data.hash}`
              : `/block/${json.data.height}`;
          this.setState({ queryStr: '' });
          this.node.current.blur();
          this.props.history.push(location);
        } else {
          this.props.addNotification({ type: 'Error', text: 'No results found' });
          throw new Error('Invalid query string');
        }
      })
      .catch(error => {
        this.setState({ data: { ...this.state.data, pending: false } });
        console.log(error.message);
      });
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      queryStr: e.target.value
    });
  };

  public render() {
    return (
      <input
        type="text"
        className="Search"
        placeholder="Search Transactions and Blocks"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        value={this.state.queryStr}
        onChange={this.onChange}
        ref={this.node}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedNode: state.nodes.selectedNode,
    nodes: state.nodes.nodes
  };
};

export const SearchInput = connect(
  mapStateToProps,
  { addNotification }
)(withRouter<Props>(SearchInputClass));
