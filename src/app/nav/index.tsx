import * as React from 'react';
import './nav.scss';
import { NodeDropdown } from 'components/node-dropdown';
import { SearchInput } from 'components/search-input';
import { NavLink } from 'react-router-dom';
import { OutsideAlerter } from 'components/outside-click';
// import { Select } from 'components/node-dropdown/components/select-node';

export class Nav extends React.Component {
  public state = {
    open: false
  };

  public toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  public render() {
    const { open } = this.state;
    return (
      <>
        <nav className="Navigation">
          <div className="Navigation-wrapper">
            <button
              className="Navigation-open-drawer"
              onClick={() => this.setState({ open: true })}
            >
              <i className="nc-icon nc-ic_menu_24px" />
            </button>
            <NavLink to="/" className="Navigation-title">
              Monero Explorer
            </NavLink>
            <div className="flex-spacer" />
            <SearchInput />
            <div className="flex-spacer" />
            <NodeDropdown />
          </div>
        </nav>
        {open && (
          <aside className="Navigation-Drawer-wrapper">
            <OutsideAlerter onClick={this.toggleDrawer}>
              <nav className="Navigation-Drawer">
                <header className="Navigation-Drawer-header">
                  <NavLink to="/" className="Navigation-title" onClick={this.toggleDrawer}>
                    Monero Explorer
                  </NavLink>
                </header>
              </nav>
            </OutsideAlerter>
          </aside>
        )}
      </>
    );
  }
}
