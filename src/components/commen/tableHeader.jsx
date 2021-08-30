import React, { Component } from "react";
class TableHeader extends Component {
  renderSortClick(getPath, getOrder, column) {
    const { sortColumn } = this.props;
    if (getPath === "like" || getPath === "delete") return sortColumn;
    if (getPath !== sortColumn.path) return { path: getPath, order: getOrder };
    return {
      path: getPath,
      order: sortColumn.order === "asc" ? "desc" : "asc",
    };
  }

  renderSortIcon(column) {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc")
      return <i className="bi bi-arrow-up-short"></i>;
    return <i className="bi bi-arrow-down-short"></i>;
  }

  render() {
    const { columns, onClick, sortColumn } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((coulmn) => {
            return (
              <td
                style={{ cursor: "pointer" }}
                onClick={() =>
                  onClick(
                    this.renderSortClick(coulmn.path, sortColumn.order, coulmn)
                  )
                }
                key={coulmn.lable || Math.random()}
              >
                {coulmn.lable}
                {this.renderSortIcon(coulmn)}
              </td>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
