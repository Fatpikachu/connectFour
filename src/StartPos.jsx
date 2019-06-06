import React from 'react'


class StartPos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
  return (<div className={'start'} id={this.props.x}></div>);
  }
}

export default StartPos