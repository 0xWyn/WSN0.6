export default function MenuItem({ item, action }) {
    return (
        <div className="cursor-pointer backdrop-blur-xl">
            <span className="font-medium text-sm tracking-wide hover:bg-blue-100/70 p-2 bg-transparent rounded-lg block transition duration-300">
                {option}
            </span>
            <span className="text-xs leading-3 text-slate-600 block px-2">
                {optionHelpers[option.toLowerCase()]}
            </span>
        </div>
    );
}
