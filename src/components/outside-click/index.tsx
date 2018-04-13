import * as React from 'react';

interface Props {
  children: React.ReactNode;
  exception?: Node;
  onClick(): void;
}

export class OutsideAlerter extends React.Component<Props> {
  public wrapperRef: any;
  constructor(props: any) {
    super(props);
    // React v16.3 createRef() API, until @types/react have updated cast as 'any'
    this.wrapperRef = (React as any).createRef();
  }

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  public handleClickOutside = (event: any) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      event.target !== this.props.exception
    ) {
      this.props.onClick();
    }
  };

  public render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
