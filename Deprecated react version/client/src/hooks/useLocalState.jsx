import { useState, useEffect } from 'react';

const useLocalState = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);

        return stickyValue !== null 
            ? JSON.parse(stickyValue) 
            : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalState;