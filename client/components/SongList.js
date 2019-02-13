import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id }
    }).then(() => this.props.data.refetch()); //this.props.data is automatically added by graphql
    // refetch method for the component itself
  }
  renderSongs() {
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}>delete</i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) { return <div>loading...</div> };
    // apollo-react automatically rerenders when query is refreshed.
    console.log(this.props); // shows new query info when rerenders

    return (
    <div>
      <ul className="collection">
        { this.renderSongs() }
      </ul>
      <Link
        to="/songs/new"
        className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
    );
  }
}

export default graphql(deleteSong)(
  graphql(fetchSongs)(SongList)
);