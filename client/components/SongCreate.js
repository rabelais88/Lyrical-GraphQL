import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    // because mutation is linked to this.props.mutate(check console above)
    this.props.mutate({
      variables: { title: this.state.title },
      // graphQL automatically associates pre-exisiting & pre-connected queries.
      // as the fetchSongs query is already used in SongList.js,
      // it automatically assumes that this query request is for SongList.js and updates SongList.js
      refetchQueries: [{ query: fetchSongs }] // only executed when the action is successfully done
      // this refetch method is for targeting parent component
    }).then(() => hashHistory.push('/'))
    .catch(() => {
    });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}/>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;


export default graphql(mutation)(SongCreate);