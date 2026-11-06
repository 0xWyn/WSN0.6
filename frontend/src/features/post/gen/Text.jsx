export default function Text({ text }) {
    return (
        <p className={`text-[12px] tracking-wide leading-6 text-slate-700`}>
            {text}
        </p>
    );
}
