import React from "react"
import ReactDOM from "react-dom"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { queryReducer } from './app/reducers/reducers.js'
import thunkMiddleware from "redux-thunk"

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const Main = React.createClass({
  render: () => {
    return (
      <div>
        <p>Hello react!</p>
      </div>
    )
  }
})

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(queryReducer)}>
    <Main />
  </Provider>,
  document.getElementById("root")
)
