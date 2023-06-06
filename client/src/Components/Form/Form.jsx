import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css';
import { getGenres } from '../../Redux/actions';
import axios from 'axios';
import { validateName, validateRating, validateDescription } from './validations';

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [isFormValid, setIsFormValid] = useState(false);

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
    genresIds: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    rating: '',
    description: '',
  });

  useEffect(() => {
    const isFormComplete = Object.values(formData).every(
      (value) => String(value).trim() !== ''
    );
    const hasErrors = Object.values(errors).every((error) => error === '');

    setIsFormValid(isFormComplete && hasErrors);
  }, [formData, errors]);

  const handleGenreToggle = (genresIds) => {
    setFormData((prevData) => {
      const updatedGenres = [...prevData.genresIds];
      if (updatedGenres.includes(genresIds)) {
        const genreIndex = updatedGenres.indexOf(genresIds);
        updatedGenres.splice(genreIndex, 1);
      } else {
        if (updatedGenres.length < 5) {
          updatedGenres.push(genresIds);
        }
      }
      return {
        ...prevData,
        genresIds: updatedGenres,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        await axios.post('http://localhost:3001/videogames', {
          name: formData.name,
          image: formData.image,
          description: formData.description,
          platforms: formData.platforms.split(','),
          rating: formData.rating,
          releaseDate: formData.releaseDate,
          genresIds: formData.genresIds,
        })
        alert('Videojuego creado exitosamente');
        setFormData({
          name: '',
          image: '',
          description: '',
          platforms: '',
          releaseDate: '',
          rating: '',
          genresIds: [],
        });
        setErrors({
          name: '',
          rating: '',
          description: '',
        });
      } catch (error) {
        alert(error.message);
      }
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    switch (name) {
      case 'name':
        validateName(value, setErrors);
        break;
      case 'rating':
        validateRating(value, setErrors);
        break;
      case 'description':
        validateDescription(value, setErrors);
        break;
      default:
        break;
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
                    id={genre.id}
                    name={genre.name}
                    checked={formData.genresIds.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
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
        <button type="submit" className={style.submitButton} disabled={!isFormValid}>
          Crear videojuego
        </button>
      </form>
    </div>
  );
};

export default Form;
