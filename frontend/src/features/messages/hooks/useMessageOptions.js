import { useEffect, useRef, useState } from "react";

export const useMessageOptions = (id) => {
    const [showMenu, setShowMenu] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const closeMenu = (e) => {
            if (e.detail !== id) {
                setShowMenu(false);
            }
        };

        window.addEventListener("close-message-menu", closeMenu);

        return () => {
            window.removeEventListener("close-message-menu", closeMenu);
        };
    }, [id]);

    const toggleMenu = () => {
        console.log("clicked");
        if (!showMenu) {
            window.dispatchEvent(
                new CustomEvent("close-message-menu", {
                    detail: id,
                })
            );
        }

        setShowMenu((prev) => !prev);
    };
    return { wrapperRef, showMenu, toggleMenu };
};
