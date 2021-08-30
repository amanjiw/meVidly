import React, { Component } from "react";
import Like from "./commen/like";
import Delete from "./commen/delete";
import TableHeader from "./commen/tableHeader";
import TableBody from "./commen/tableBody";
import _ from "lodash";
import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";
class MoveiTable extends Component {
  constructor() {
    super();
    const user = getCurrentUser();
    user && this.columns.push(this.handleLike ());
    user && this.columns.push(this.handleDelete());
  }

  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link className="btn text-black"  style={{textDecoration:"none"  , fontWeight:"bolder" ,}}  test="amanj" to={`movies/${movie._id}`}>
          {movie.title}
        </Link>
      ),
    },
    {
      path: "genre.name",
      lable: "Genre",
    },
    {
      path: "numberInStock",
      lable: "Stock",
    },
    {
      path: "dailyRentalRate",
      lable: "Rate",
    },
  ];

  handleDelete() {
    return {
      path: "delete",
      key: "delete",
      content: (movie) => (
        <Delete
          result={this.props.result}
          onClick={() => this.props.onDelete(movie)}
        />
      ),
    };
  }

  handleLike() {
    return {
      path: "like",
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    };
  }

  render() {
    const { movieResult, sortColumn, onSort } = this.props;
    return (
      <table className="table mt-3">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onClick={onSort}
        />
        <TableBody columns={this.columns} movieResult={movieResult} />
      </table>
    );
  }
}

export default MoveiTable;
