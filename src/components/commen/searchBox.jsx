import React, { Component } from "react";
class SearchBox extends Component {
  render() {
      const {onChange , value} = this.props
    return (
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="text "
        placeholder="Search for a movie..."
        className="form-control my-3"
      />
    );
  }
}

export default SearchBox;
