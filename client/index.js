import './style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

// the method is slightly different in apollo 2.0
const client = new ApolloClient({
  dataIdFromObject: o => o.id, // use .id to recognize change in data
  // if change is detected, query refetch will be requested
  // for this project, it is used for LyricCreate.js
  // otherwise, cache will be used
});

const Root = () => {
  return (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/new" component={SongCreate}></Route>
        <Route path="songs/:id" component={SongDetail}></Route>
      </Route>
    </Router>
  </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
