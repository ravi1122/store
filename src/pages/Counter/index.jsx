import React from "react";
import { connect } from "react-redux";

import { increment, decrement, reset } from "./actions";

function Counter(props) {
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-6 col-offset-3">
        <div className="card text-center">
          <div className="card-header">Counter</div>
          <div className="card-body">
            <h5 className="card-title f1">{props.counter}</h5>
          </div>
          <div className="card-footer text-muted">
            <button className="btn btn-primary" onClick={props.increment}>
              Increment
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-primary" onClick={props.reset}>
              Reset
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-primary" onClick={props.decrement}>
              Decrement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = { increment, decrement, reset };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
