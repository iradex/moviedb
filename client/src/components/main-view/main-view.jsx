import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';

import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';




  export class MainView extends React.Component {

    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registered: null
    };
    }

    // One of the "hooks" available in a React Component
    componentDidMount() {
      axios.get('https://moviedatabase5.herokuapp.com/movies')
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.username
  });
  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.username);
  this.getMovies(authData.token);
}

  onRegistered(event) {
    this.setState({
      registered: true
    });
  }


getMovies(token) {
  axios.get('https://moviedatabase5.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}


  render() {
    const { movies, selectedMovie, user, registered} = this.state;

    if (!registered) return <RegisterView onRegistered={event => this.onRegistered(event)}/>

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;



    

    // Before the movies have been loaded
   // if (!movies) return <div className="main-view"/>;

    return (
    
    <div className="main-view">
    
     <Container>
      <Row>
      {selectedMovie
         ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)}/>
         : movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
         ))
      }
      </Row>
      </Container>
     </div>
    );
  }
}

  