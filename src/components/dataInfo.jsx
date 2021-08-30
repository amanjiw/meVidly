import React, { Component } from "react";
class DataInfo extends Component {
  state = {};
  render() {
    const { allData } = this.props;
    if (allData < 1)
      return <h2 className="mb-5 mt-3 ms-3 ">there are no movies in data base</h2>;
    return (
      <h4 className="mb-2 mt-3 ms-3 ">
        there are <span className="text-warning"> {allData} </span> movies in
        data base
      </h4>
    );
  }
}

export default DataInfo;
