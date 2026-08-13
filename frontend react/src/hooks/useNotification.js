import { useState } from "react";

export default function useNotification() {
  const [notification, setNotification] = useState({
      status: 'idle',   // 'idle' | 'loading' | 'success' | 'error'
      message: '',      // Global notification message
      isVisible: false
    });
  
    const showNotification = (status= 'success' , message, duration= 3000) => {
      setNotification({ 
        status,
        message, 
        isVisible: true
       });
      
      setTimeout(() => {
        setNotification({ status: 'idle', message: '', isVisible: false });
      }, 5350);
    };

    return { notification, showNotification };
}