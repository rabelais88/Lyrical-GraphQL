import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) { return <div>loading...</div> };
    // apollo-react automatically rerenders when query is refreshed.
    console.log(this.props); // shows new query info when rerenders

    return (<div>
      { this.renderSongs() }
    </div>);
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);