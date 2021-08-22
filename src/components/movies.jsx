import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
  };

  columns = [
    {
      path: "title",
      lable: "Title",
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

  componentDidMount() {
    const movies = getMovies();
    const genres = getGenres();
    this.setState({ movies, genres });
  }

  render() {
    console.log(this.state.movies);
    console.log(this.state.genres);

    return (
      <React.Fragment>
        <i class="bi bi-alarm"></i>
        <h2 className="mt-3 ms-3 ">
          there are{" "}
          <span className="text-warning"> {this.state.movies.length} </span>{" "}
          movies in data base
        </h2>
        <table className="table mt-5">
          <thead>
            <tr>
              {this.columns.map((coulmn) => {
                return <td key={coulmn.lable}>{coulmn.lable}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  {this.columns.map((coulmn) => (
                    <td key={coulmn.path}> {_.get(movie, coulmn.path)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
