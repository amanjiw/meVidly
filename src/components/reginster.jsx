import React, { Component } from "react";
import { regeisterUser } from "../services/userService";
import { loginWithJwt } from "../services/authService";
import Joi, { errors } from "joi-browser";
import { toast } from "react-toastify";
import Form from "./commen/form";
class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema() {
    return {
      username: Joi.string().min(5).required(),
      password: Joi.string().min(5).required(),
      name: Joi.string().min(5).required(),
    };
  }

  // specialSchema() {
  //   return {
  //     username: Joi.string().required(),
  //     password: Joi.string().required(),
  //     name: Joi.string().required(),
  //   };
  // }

  async doSubmit() {
    try {
      const response = await regeisterUser(this.state.data);
      loginWithJwt(response.headers["x-auth-token"])
      window.location = "/";
    } catch (err) {
      if (err.response) toast.warning(err.response.data);
      console.log(err);
    }
  }

  render() {
    return (
      <div className="mt-4">
        <h1 className="mb-3">Register</h1>
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

          {this.renderInput(
            "name",
            this.handleChange,
            "name",
            this.state.errors.name,
            this.state.data.name
          )}
          {this.renderButton("Register", this.state.errors)}
        </form>
      </div>
    );
  }
}

export default Register;
