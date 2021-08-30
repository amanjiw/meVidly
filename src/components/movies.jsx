import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import MoveiTable from "./moviesTable";
import Pagination from "./commen/pagination";
import paginate from "../utils/paginate";
import DataInfo from "./dataInfo";
import ListGroup from "./listGroup";
import SearchBox from "./commen/searchBox";
import _ from "lodash";
// import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    try {
      const { data: movies } = await getMovies();
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "AllGenres" }, ...data];
      this.setState({ movies, genres });
    } catch (err) {
      console.log("amanjItIsErrorr:", err);
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  movieResult() {
    const {
      movies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filteredMovies = [...movies];

    if (searchQuery)
      filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = movies.filter(
        (mv) => mv.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const result = paginate.showResultOfCurrentPage(
      sorted,
      currentPage,
      pageSize
    );

    return { result, totalCount: filteredMovies.length };
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  async handleDelete(movie) {
    const originalmovies = [...this.state.movies];
    const movies = [...originalmovies];
    try {
      const index = movies.findIndex((mv) => mv._id === movie._id);
      movies.splice(index, 1);
      this.setState({ movies });
      await deleteMovie(movie._id);
    } catch (err) {
      if (err.response && err.response.status === 400) toast.info("x");
      toast.error(err.response.data);
      this.setState({ movies: originalmovies });
    }
  }

  handelSelectedGenre(genre) {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  handleSortColumn(sortColumn) {
    this.setState({ sortColumn });
  }

  handleSearch = (query) => {
    const searchQuery = query;
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
  };
  render() {
    console.log(this.props.user);
    const { result, totalCount } = this.movieResult();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              selectedGenre={this.state.selectedGenre}
              onSelectedItem={this.handelSelectedGenre.bind(this)}
              items={this.state.genres}
            />
          </div>
          <div className="col-9">
           {this.props.user && <Link to="/movies/new">
              <button className="mt-5 btn btn-dark"> NewMovie</button>
            </Link>}
            <DataInfo allData={this.state.movies.length} />
            <SearchBox
              onChange={this.handleSearch}
              value={this.state.searchQuery}
            />
            <MoveiTable
              sortColumn={this.state.sortColumn}
              onLike={this.handleLike.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              onSort={this.handleSortColumn.bind(this)}
              columns={this.columns}
              movieResult={result}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
