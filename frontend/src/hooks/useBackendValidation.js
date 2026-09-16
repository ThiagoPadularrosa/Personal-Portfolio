import { useCallback } from "react";
import useNotification from "./useNotification";

export default function useBackendValidation() {
  
  const { notification, showNotification } = useNotification();


  const validateAndSubmit = useCallback(async (formData) => {
    // Set status to loading when the request starts
    showNotification( 'loading', '', 5350 );

    // Fetch call
    try {
      const response = await fetch(`/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const Data = await response.json();
      
      if (!response.ok) { 
        // Here i handle backend validation failures (400/422 bad requests is a good expm)
        // Also every code that i write after throw is dead code. It won't show
        throw new Error(Data.message || `Server responded with status ${response.status}`); 
      }
      
      showNotification( 'success', Data.message || 'Data submitted successfully!', 5350 );
      // Logs
      console.log('Server response:', Data);  
      console.log("Form submitted");

    } catch (error) {
      console.error('Request failed:', error.message);
      showNotification( 'error', error.message || 'A network error ocurred.', 5350 );
    };
  }, [showNotification]);

  return { notification, showNotification, validateAndSubmit };
}