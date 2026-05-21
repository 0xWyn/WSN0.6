export default function Bio({ bio }) {
    return (
        <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-900">Bio</h2>

            <p className="max-w-2xl text-[15px] leading-8 text-slate-600">
                {bio || "This user has not added a bio yet."}
            </p>
        </div>
    );
}
