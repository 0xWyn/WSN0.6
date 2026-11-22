export const TextQuote = ({ size = "24" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-text-quote preview-icon"
        >
            <path d="M17 5H3" />
            <path d="M21 12H8" />
            <path d="M21 19H8" />
            <path d="M3 12v7" />
        </svg>
    );
};
