import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }

    });

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }, [key, value]);
    
    return [
        value,
        setValue
    ] as const
}