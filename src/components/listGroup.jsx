import React, { Component } from "react";
class ListGroup extends Component {
  state = {};
  render() {
    const { items, onSelectedItem, selectedGenre } = this.props;
    return (
      <div className="list-group mt-5">
        {items.map((item) => (
          <a
            key={item._id}
            onClick={() => onSelectedItem(item)}
            href="#"
            className={
              selectedGenre === item
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            aria-current="true"
          >
            {item.name}
          </a>
        ))}
      </div>
    );
  }
}

export default ListGroup;
