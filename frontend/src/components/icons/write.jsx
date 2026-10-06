export default function Write({ size = "3.5" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`size-${size}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
            />
        </svg>
    );
}
