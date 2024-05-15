import { useState, useCallback } from "react";
export const useNavigation = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleNav = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return { isOpen, toggleNav };
};
