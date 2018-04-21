import * as React from 'react';
import './nav.scss';
import { NodeDropdown } from 'components/node-dropdown';
import { SearchInput } from 'components/search-input';
import { NavLink } from 'react-router-dom';
import { OutsideAlerter } from 'components/outside-click';
import { Select } from 'components/node-dropdown/components/select-node';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Logo = () => (
  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik00MC41NDA4MjY4LjM1OTQ1ODgybC0uMDQ1MjE0NyA0Ljc5Mjg4NDkzSDE5TDM0LjcyMjEzMjggMjcuMDUyOTIyIDE5IDQ5LjY0Mzg5NzFoMjEuNjIyNjR2NS42ODM2NTU4SDE2LjU4MDk1MDZMLjcxMzAyODY5IDI3Ljg0MzUwNTkgMTYuNTgwOTUwNi4zNTk0NTg4MmgyMy45NTk4NzYyem01LjM1NjkxODQgMGgyLjQxOTA0OTRMNjQuMTg0NzE2NSAyNy44NDM1MDU5bC0xNS44Njc5MjE5IDI3LjQ4NDA0N2gtMi40MTkwNDk0VjQ0LjI0OTY5MjZIMzAuMjk1MjMwMUw0Mi40NjI1NjIgMjcuMTY5OTUwMSAzMC4yOTUyMzAxIDkuNzYxMjMwNDdoMTUuNjAyNTE1MVYuMzU5NDU4ODJ6IiBpZD0iYSIvPjwvZGVmcz48dXNlIGZpbGw9IiNmZmYiIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAyOCAyOCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==" />
);

export class Nav extends React.Component {
  public state = {
    open: false
  };

  public toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  public render() {
    const { toggleDrawer } = this;
    const { open } = this.state;
    return (
      <>
        <nav className="Navigation">
          <div className="Navigation-wrapper">
            <button
              className="Navigation-open-drawer"
              onClick={() => this.setState({ open: true })}
            >
              <i className="nc-icon nc-ic_menu_24px size_24px" />
            </button>
            <NavLink to="/" className="Navigation-title">
              <Logo />
              Monero Explorer
            </NavLink>
            <div className="flex-spacer" />
            <SearchInput />
            <div className="flex-spacer" />
            <NodeDropdown />
          </div>
        </nav>
        <TransitionGroup>
          {open && (
            <CSSTransition classNames="Navigation-Drawer-animation" timeout={200}>
              <aside className="Navigation-Drawer-wrapper">
                <OutsideAlerter onClick={this.toggleDrawer}>
                  <nav className="Navigation-Drawer">
                    <header className="Navigation-Drawer-header">
                      <NavLink to="/" className="Navigation-title" onClick={toggleDrawer}>
                        <Logo />
                        Monero Explorer
                      </NavLink>
                    </header>
                    <Select onSelect={toggleDrawer} />
                  </nav>
                </OutsideAlerter>
              </aside>
            </CSSTransition>
          )}
        </TransitionGroup>
      </>
    );
  }
}
