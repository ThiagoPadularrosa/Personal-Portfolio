import { useRef, useState } from "react";
import useBackendValidation from "./useBackendValidation";
import useNotification from "./useNotification";

export default function useFrontendValidation() {

  const { showNotification, notification, validateAndSubmit, userNameError } = useBackendValidation(); 
 
  const [formData, setFormData] = useState({
      username: '',
      lastname: '',
      email: '', 
      message: '',
      checkbox: false
    });
  
  const [error, setError] = useState(""); 
  const [errors, setErrors] = useState({}); // To displayed errors for UI
  const [hasError, setHasError] = useState(false);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // HANDLE THE FRONTEND UI SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    let esValido = true;
    let tempErrors = {};

    const { username, lastname, email, message, checkbox } = formData
    const inputs = [username, lastname, email, message, checkbox];
    const inputNames = ['username', 'lastname', 'email', 'message', 'checkbox'];
    
    // To validate the results if the inputs all or at least one is empty
    const validationResults = inputs.map(input => typeof input === 'boolean' ? !input : !input?.trim());
    const allEmpty = validationResults.every(isEmpty => isEmpty);
    const atLeastOneInputIsEmpty = validationResults.some(isEmpty => isEmpty);
    
    // Condition to validate if the inputs are completed.
    if (allEmpty) {
      inputNames.forEach(name => {
        tempErrors[name] = true;
      });
      esValido = false;
    } else if (atLeastOneInputIsEmpty) {
      validationResults.forEach((isEmpty, index) => {
        if (isEmpty) {
          const name = inputNames[index];
          tempErrors[name] = true;
        }
      });
      esValido = false;
    } 
    
    // Email validation
    if (formData.email.trim() === '') {
      setError('*Please, enter a email')
      esValido = false;
    } else if (formData.email.trim() !== ''  && !regex.test(formData.email)) {
      setError('*Please, enter a valid email address');
      validationResults[2] = true;
      tempErrors['email'] = true;
      esValido = false; 
    } else {
      setError('')
    }
    
    setErrors(tempErrors);

    if (!esValido && Object.keys(tempErrors).length > 0) {
      showNotification('error', '', 5350);
      return; // Need to learn in which situations/when is better to use return, otherwise i will've the same problem.  
    };

    // Pass the data to the validation hook
    validateAndSubmit(formData);
  }
  return { 
    formData,
    notification,
    error,
    errors,
    hasError,
    handleInputChange,
    handleSubmit,
    userNameError
  }; 
}