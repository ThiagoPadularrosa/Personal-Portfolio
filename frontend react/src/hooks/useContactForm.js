import { useRef, useState } from "react";
import useNotification from "./useNotification";


export function useContactForm() {

  const { notification, showNotification } = useNotification();  
  
  const [formData, setFormData] = useState({
      username: '',
      lastname: '',
      email: '', 
      message: '',
      checkbox: false
    });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(false);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   
    let esValido = true;

    const { username, lastname, email, message, checkbox } = formData
    const inputs = [username, lastname, email, message, checkbox];
    const inputNames = ['username', 'lastname', 'email', 'message', 'checkbox'];
    const validationResults = inputs.map(input =>
      typeof input === 'boolean' ? !input : !input?.trim()
    );

    const allEmpty = validationResults.every(isEmpty => isEmpty);
    const atLeastOneInputIsEmpty = validationResults.some(isEmpty => isEmpty);

    let tempErrors = {};
    
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
      showNotification('', 'error', 5350)
      return; // Need to learn in which situations/when is better to use return, otherwise i will've the same problem.  
    };

    try {
      const response = await fetch("http://localhost:4000/api/data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Server response:', responseData)
    } catch (error) {
      console.error('Request failed:', error.message);
    };

    showNotification('', 'success', 2830);
    console.log("Form submitted:", formData);

  };
  return { 
    formData,
    notification,
    error,
    errors,
    hasError,
    handleInputChange,
    handleSubmit, 
  }; 
}