export default function ClanCreationModal({ setShowModal }) {
    return (
        <div className="w-full h-full border flex justify-center items-center">
            <div className="w-xl h-l bg-slate-700 rounded-full">
                <button onClick={() => setShowModal(false)}>x</button>
            </div>
        </div>
    );
}
