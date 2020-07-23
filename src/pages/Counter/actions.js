// closure, currying, high order function
// hoisting

// Triggers
export function increment() {
  return (dispatch) => dispatch({ type: "INCREMENT" });
}

export function decrement() {
  return (dispatch) => dispatch({ type: "DECREMENT" });
}

export function reset() {
  return (dispatch) => dispatch({ type: "RESET" });
}
