import React from 'react'


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onClick(){
    this.props.markBoard(this.props.y)
  }

  render() {
    return (<div id={'' + this.props.x + this.props.y} 
            className='square'
            onClick={this.onClick.bind(this)} 
            onMouseEnter={()=> this.props.mouseEnter(this.props.y)}
            onMouseLeave={()=> this.props.mouseLeave(this.props.y)}
            >
            <div className='circle'></div>
        </div>);
  }
}

export default Square