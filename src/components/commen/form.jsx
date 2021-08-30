import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
class Form extends Component {
  state = {};

  validate = () => {
    const options = { abortEarly: false };
    const schema = this.schema();
    const { error } = Joi.validate(this.state.data, schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const getSchema = this.schema();
    const schema = { [name]: getSchema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0] : null;
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data[input.name] = input.value;
    console.log("testingggg", input.name, input.value);
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage.message;
    else delete errors[input.name];
    this.setState({ data, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className=" mt-4 btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(label, onChange, name, error, value, type = "text") {
    return (
      <div>
        <label htmlFor="exampleInputEmail1" className="form-label">
          {label}
        </label>
        <input
          onChange={onChange}
          name={name}
          value={value}
          type={type}
          className="form-control mb-3"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }

  renderSelect(label, value, onChange, name, options, error) {
    return (
      <div>
        <label htmlFor="exampleInputEmail1" className="form-label">
          {label}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className=" mb-3 form-select"
          aria-label="Default select example"
        >
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Form;
