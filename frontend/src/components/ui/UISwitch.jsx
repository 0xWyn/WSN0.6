export default function UISwith({ onClick }) {
    return (
        <div
            onClick={onClick}
            className={`rounded-md absolute z-100 top-10 left-10 size-20 shadow-md ${tempLoading ? "bg-green-400" : "bg-slate-800"} hover:scale-[1.05] hover:shadow-lg cursor-pointer transition active:scale-[0.95]`}
        ></div>
    );
}
