import { useEffect, useState, useRef } from "react";

const useAppBarHeight = () => {
    const [appBarHeight, setAppBarHeight] = useState(0);
    const appBarRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (appBarRef.current) {
                const height = appBarRef.current.clientHeight;
                setAppBarHeight(height);
                console.log(height)
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return [appBarHeight, appBarRef];
};

export default useAppBarHeight;
