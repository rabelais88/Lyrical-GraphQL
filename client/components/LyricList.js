import React, { Component } from 'react';

class LyricList extends Component {
  renderLyric({id, content}) {
    return (<li key={id} className="collection-item">{content}</li>);
  }
  render() {
    console.log(this.props);
    return (
      <ul className="collection">
        {this.props.lyrics.map(this.renderLyric)}
      </ul>
    );
  }
}

export default LyricList;