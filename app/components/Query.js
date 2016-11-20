const Component = require('Component');
const React = require('React');
const connect = require('connect');
const getGraph = require('getGraph');

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGraph } from '../actions/actions'

class Query extends Component {
  componentDidMount() {
    this.props.dispatch(
      getGraph("{goldberg(id: 2) {id, character, actor}}")
    );
  }
  render(){
    let dispatch = this.props.dispatch
    let fetchInProgress = String(this.props.store.get('fetching'))
    let queryText;
    let goldberg = this.props.store.get('data').toObject();
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <h3>{ goldberg.character }</h3>
        <p> { goldberg.actor }</p>
        <p> { goldberg.role }</p>
        <p> { goldberg.traits }</p>
        <input  style={{ width: '300px'}} ref={node => { queryText = node}}></input>
        <button onClick={ () => {
          dispatch(getGraph(`{goldberg(id: ${queryText.value}) {id, actor}}`))
        }}> Query </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
}

export const QueryContainer = connect(
  mapStateToProps
)(Query);
