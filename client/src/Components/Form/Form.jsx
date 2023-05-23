import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css';
import { getGenres } from '../../Redux/actions';
import axios from 'axios';

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    platforms: '',
    releaseDate: '',
    rating: '',
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    rating: '',
    description: '',
  });

  const validateRating = (form) => {
    if (form.rating > 5 || form.rating < 1) {
      setErrors({ ...errors, rating: 'El número debe estar entre 1 y 5' });
    } else {
      setErrors({ ...errors, rating: '' });
    }
  };

  const validateDescription = (form) => {
    const regex = /^[a-zA-Z0-9\s,:.'"Ññ\-()]+$/;
    if (regex.test(form.description) && form.description.length <= 400) {
      setErrors({ ...errors, description: '' });
    } else {
      setErrors({
        ...errors,
        description: 'La descripción no puede tener caracteres especiales y debe tener hasta 400 caracteres',
      });
    }
  };

  const validateName = (form) => {
    const regex = /^[A-Za-z0-9\s:,''.Ññ]{2,40}$/;
    if (regex.test(form.name)) {
      setErrors({ ...errors, name: '' });
    } else {
      setErrors({
        ...errors,
        name: 'El nombre debe tener entre 2 y 40 caracteres y no admite caracteres especiales',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'name':
        validateName({ ...formData, [name]: value });
        break;
      case 'rating':
        validateRating({ ...formData, [name]: value });
        break;
      case 'description':
        validateDescription({ ...formData, [name]: value });
        break;
      default:
        break;
    }
  };

  const handleGenreToggle = (genreName) => {
    setFormData((prevData) => {
      const updatedGenres = [...prevData.genres];
      if (updatedGenres.includes(genreName)) {
        // Género ya seleccionado, lo eliminamos
        const genreIndex = updatedGenres.indexOf(genreName);
        updatedGenres.splice(genreIndex, 1);
      } else {
        if (updatedGenres.length < 5) {
          // Género no seleccionado y se cumple el límite, lo agregamos
          updatedGenres.push(genreName);
        }
      }
      return {
        ...prevData,
        genres: updatedGenres,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.name === '' && errors.description === '' && errors.rating === '') {
      await axios
        .post('http://localhost:3001/videogames', {
          name: formData.name,
          image: formData.image,
          description: formData.description,
          platforms: formData.platforms.split(','),
          rating: formData.rating,
          releaseDate: formData.releaseDate,
          genres: formData.genres,
        })
        .then((r) => alert(r.data))
        .catch((e) => alert(e));
      setFormData({
        name: '',
        image: '',
        description: '',
        platforms: '',
        releaseDate: '',
        rating: '',
        genres: [],
      });
    } else {
      alert('Corrige los campos para enviar el formulario');
    }
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>Agregar nuevo videojuego</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="image">Imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          {errors.description && (
            <span className={style.error}>{errors.description}</span>
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="platforms">Plataformas:</label>
          <input
            type="text"
            id="platforms"
            name="platforms"
            value={formData.platforms}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="releaseDate">Fecha de lanzamiento:</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label>Géneros:</label>
          <div className={style.checkboxGroup}>
            {genres.length !== 0 &&
              genres.map((genre) => (
                <div className={style.checkboxItem} key={genre.id}>
                  <input
                    type="checkbox"
                    id={genre.name}
                    name={genre.name}
                    checked={formData.genres.includes(genre.name)}
                    onChange={() => handleGenreToggle(genre.name)}
                  />
                  <label
                    htmlFor={genre.name}
                    className={style.checkboxLabel}
                  >
                    {genre.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
          {errors.rating && <span className={style.error}>{errors.rating}</span>}
        </div>
        <button type="submit" className={style.submitButton}>
          Crear videojuego
        </button>
      </form>
    </div>
  );
};

export default Form;
