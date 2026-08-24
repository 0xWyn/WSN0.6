export default function Text({ text, size = "md" }) {
    return (
        <div>
            <p className={`text-${size} leading-8 text-slate-700`}>{text}</p>
        </div>
    );
}
