import { useCallback } from 'react';

const useSound = () => {
    // Arrow function with if-else statements
    const playSound = useCallback((type) => {
        let sound;
        
        if (type === 'click') {
            sound = new Audio('/src/assets/sound/double-click.wav'); 
        } else if (type === 'success') {
            sound = new Audio('/src/assets/sound/success-Sound.wav');
        } else if (type === 'error') {
            sound = new Audio('/src/assets/sound/error_sound.wav');
        } else {
            console.error('Unknown sound type');
            return;
        }
        
        if (sound) {
            sound.play().catch(e => console.error('Error playing sound:', e));
        }
    }, []);
    
    return { playSound };
}

export default useSound;
