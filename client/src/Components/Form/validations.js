export const validateName = (value, setErrors) => {
    const regex = /^[A-Za-z0-9\s:,''.Ññ]{2,40}$/;
    if (regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: '',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'El nombre debe tener entre 2 y 40 caracteres y no admite caracteres especiales',
      }));
    }
  };
  
  export const validateRating = (value, setErrors) => {
    const rating = parseFloat(value);
    if (rating >= 1 && rating <= 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rating: '',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rating: 'El número debe estar entre 1 y 5',
      }));
    }
  };
  
  export const validateDescription = (value, setErrors) => {
    const regex = /^[a-zA-Z0-9\s,:.'"ÑñÁáÉéÍíÓóÚúÜü\-()]+$/;
    if (regex.test(value) && value.length <= 400) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: '',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'La descripción no puede tener caracteres especiales (excepto acentos) y debe tener hasta 400 caracteres',
      }));
    }
  };
  