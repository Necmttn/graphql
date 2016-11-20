const Provider = require('Provider.react');
const QueryContainer = require('QueryContainer.react');
const React = require('React');
const ReactDOM = require('ReactDOM');

const applyMiddleware = require('applyMiddleware');
const createStore = require('createStore');
const queryReducer = require('queryReducer');
const thunkMiddleware = require('thunkMiddleware');

import React from "react"
import ReactDOM from "react-dom"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { queryReducer } from './app/reducers/reducers.js'
import thunkMiddleware from "redux-thunk"

import { QueryContainer } from './app/components/Query'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)
// TODO:10 clean up this code
const Main = React.createClass({
  render: () => {
    return (
      <div>
        <QueryContainer />
      </div>

)  }
})

// FIXME:0 it's looks ugly

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(queryReducer)}>
    <Main />
  </Provider>,
  document.getElementById("root")
)
