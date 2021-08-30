import React, { Component } from "react";
import _ from "lodash"
class TableBody extends Component {
  renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }

  render() {
    const { movieResult, columns } = this.props;

    return (
      <tbody>
        {movieResult.map((movie) => {
          return (
            <tr key={movie._id}>
              {columns.map((coulmn) => (
                <td key={coulmn.path || coulmn.key}>
                  {" "}
                  {this.renderCell(movie, coulmn)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
