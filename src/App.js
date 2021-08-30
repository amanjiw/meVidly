import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './services/authService';
import NavBar from './components/navBar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rental from './components/rental';
import Login from './components/Login';
import Register from './components/reginster';
import MovieForm from './components/movieForm';
import UserLogedIn from './components/userlogedin';
import LogOut from './components/logOut';
import NotFound from "./components/notFound.jsx"
import ProtectedRoute from './components/protectedRoute';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css';
// import { getMovies } from './services/genreService';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {

  };



  componentDidMount() {
    const user = getCurrentUser()
    this.setState({ user })
  }


  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container col-7">
          <Switch>
            <Route exact path="/movies" render={props => <Movies {...props} user={user} />} />
            {/* <Route path="/movies/:id" component={MovieForm} /> */}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rental" component={Rental} />
            <Route path="/login" render={props => user ? <Redirect to="/" /> : <Login {...props} />} />
            <Route path="/register" render={props => user ? <Redirect to="/" /> : <Register {...props} />} />
            <Route path="/userlogedIn" component={UserLogedIn} />
            <Route path="/logout" component={LogOut} />
            <Route path="/notFound" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
