// GlobalClickListener.js

import { useEffect } from "react";


const useGlobalClickListener = (callback) => {
  useEffect(() => {
    
    const handleClick = (event) => {
        const target = event.target;
        
        
        if (
          target.tagName === 'BUTTON' ||
          target.closest('[data-sound]') 
        ) {
          callback(event);
        }
      };
  

    document.addEventListener('click', handleClick);

  
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback]);
};

export default useGlobalClickListener;
