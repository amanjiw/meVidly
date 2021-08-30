import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Form from "./commen/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    movies: [],
    genres: [],
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
  };

  schema() {
    return {
      _id: Joi.string(),
      title: Joi.string().min(5).required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().min(2).required(),
      dailyRentalRate: Joi.number().min(0).max(10).required(),
    };
  }

  async componentDidMount() {
    try {
      const movieId = this.props.match.params.id;
      const { data: genres } = await getGenres();
      this.setState({ genres });
      if (movieId === "new") return;
      const { data } = await getMovie(movieId);
      this.setState({ genres, data: this.moveToViewModel(data) });
    } catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace("/notFound");
    }
  }

  moveToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  async doSubmit() {
    try {
      const { data } = this.state;
      console.log(data);
      await saveMovie(data);
      this.props.history.push("/movies");
    } catch (err) {
      if (err.response && err.response)
        toast.error("you should log in to  your account first");
      //  if(err.response ) toast.error(err.response.data)
    }
  }

  render() {
    console.log(this.state.errors);
    return (
      <div className="mt-4">
        <h1 className="mb-3">Movie Form </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "Title",
            this.handleChange,
            "title",
            this.state.errors.title,
            this.state.data.title
          )}

          {this.renderSelect(
            "Genre",
            this.state.data.genreId,
            this.handleChange,
            "genreId",
            this.state.genres,
            this.state.errors.genreId
          )}

          {this.renderInput(
            "Number in Stock",
            this.handleChange,
            "numberInStock",
            this.state.errors.numberInStock,
            this.state.data.numberInStock
          )}
          {this.renderInput(
            "Rate",
            this.handleChange,
            "dailyRentalRate",
            this.state.errors.dailyRentalRate,
            this.state.data.dailyRentalRate
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
