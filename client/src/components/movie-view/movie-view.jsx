import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

 

  render() {
   const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
       <div className="movie-view">
        <Button variant="secondary" onClick={() => onClick() }>← Back</Button>
        <div className="movie-title">
         <h1 className="value">{movie.Title}</h1>
        </div>
        <div className="movie-genre">
          <div className="value">Genre: {movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="value">Director: {movie.Director.Name}</div>
        </div>
        <div className="movie-description">
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} />
        
       </div>


    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};