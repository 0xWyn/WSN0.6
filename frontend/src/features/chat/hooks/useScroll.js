import { useEffect, useRef, useState } from "react";

export const useScroll = (messages) => {
    const [isNearBottom, setIsNearBottom] = useState(true);
    const containerRef = useRef(null);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const threshold = 120;

        const position =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        const atBottom = position < threshold;

        if (atBottom) {
            console.log(position);
        }

        setIsNearBottom(atBottom);
    };

    const scrollToBottom = () => {
        const container = containerRef.current;

        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behaviour: "smooth",
        });
        container.scrollTop = container.scrollHeight;
    };

    useEffect(() => {
        if (isNearBottom) {
            requestAnimationFrame(scrollToBottom);
        }
    }, [messages]);

    return { containerRef, handleScroll, scrollToBottom, isNearBottom };
};
