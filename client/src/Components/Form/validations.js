


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
        name: 'The name must be between 2 and 40 characters and does not support special characters',
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
        rating: 'The number must be between 1 and 5',
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
        description: 'The description cannot have special characters (except accents) and must be up to 400 characters',
      }));
    }
  };
  