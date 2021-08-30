import React, { Component } from "react";
class Delete extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="btn btn-danger text-ligh btn-sm" onClick={onClick}>
        Delete
      </button>
    );
  }
}

export default Delete;
