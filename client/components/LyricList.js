import React, { Component } from 'react';
import likeLyric from '../queries/likeLyric';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        }
      }
    });
  }
  renderLyric({id, content, likes}) {
    return (
      <li key={id} className="collection-item">
        {content}
        <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>{likes}
      </li>
    );
  }
  render() {
    console.log(this.props);
    return (
      <ul className="collection">
        {this.props.lyrics.map(this.renderLyric.bind(this))}
      </ul>
    );
  }
}

export default graphql(likeLyric)(LyricList);