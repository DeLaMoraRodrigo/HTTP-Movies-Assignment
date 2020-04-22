import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = props => {
    const initialMovie = {
        title: "",
        director: "",
        metascore: "",
        stars: ["", "", ""]
    }

    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
             .then(res => {
                 console.log({ res })
                 setMovie(res.data)
             })
             .catch(err => {
                 console.log({ err })
             })
    }, [id])

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
          value = parseInt(value, 10);
        }
    
        setMovie({
          ...movie,
          [ev.target.name]: value
        });
    };

    const starsChangeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        let index = parseInt(ev.target.id, 10)
    
        setMovie({
          ...movie,
          stars: [
              ...movie.stars,
              movie.stars[index] = `${value}`
          ]
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
            push(`/`);
          })
          .catch(err => console.log({err}));
      };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="star1"
                    id="0"
                    onChange={starsChangeHandler}
                    placeholder="First Star"
                    value={movie.stars[0]}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="star2"
                    id="1"
                    onChange={starsChangeHandler}
                    placeholder="Second Star"
                    value={movie.stars[1]}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="star3"
                    id="2"
                    onChange={starsChangeHandler}
                    placeholder="Third Star"
                    value={movie.stars[2]}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;