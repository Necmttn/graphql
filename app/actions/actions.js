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
