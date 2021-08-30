import React, { Component } from "react";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import Form from "./commen/form";
import Joi from "joi-browser";
class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema() {
    return {
      username: Joi.string().min(5).required(),
      password: Joi.string().min(5).required(),
    };
  }

  async doSubmit() {
    try {
      const user = { ...this.state.data };
      await loginUser(user);
      const {state} = this.props.location
      console.log(state)
      window.location = state ? state.from.pathname : "/" ;
    } catch (err) {
      if (err.response) toast.error(err.response.data);
      console.log(err.response);
    }
  }

  render() {
    return (
      <div className="mt-4">
        <h1 className="mb-3">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "Email",
            this.handleChange,
            "username",
            this.state.errors.username,
            this.state.data.username
          )}
          {this.renderInput(
            "Password",
            this.handleChange,
            "password",
            this.state.errors.password,
            this.state.data.password
          )}

          {this.renderButton("Login", this.state.errors)}
        </form>
      </div>
    );
  }
}

export default Login;
