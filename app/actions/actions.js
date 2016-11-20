const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
}

const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response: response
  }
}

// The great thing about the redux-thunk middleware we applied to our store
// earlier is that when an action returns a function that
// function is injected with dispatch().

export const getGraph = (payload) => {
  return dispatch => {
    dispatch(startingRequest());
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest()
      request.open("POST", "/graphql", true)
      request.setRequestHeader("Content-Type", "application/graphql")
      request.send(payload)
      request.onreadystatechange = () => {
        if (request.readyState === 4) resolve(request.responseText)
      }
    }).then(response => dispatch(finishedRequest(JSON.parse(response))))
  }
}

// When getGraph() is called we dispatch startingRequest() to indicate the
// start of a new query. We then begin the async request
// (note the “application/graphql” content type in the header) and when our
// query is complete we dispatch finishedRequest() with
// the results of our query.
