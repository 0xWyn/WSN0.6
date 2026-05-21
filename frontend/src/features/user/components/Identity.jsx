export default function Identity({ user }) {
    return (
        <div className="pb-2">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-200 md:text-slate-400">
                Profile
            </p>

            <h1 className="!text-[2em] !font-semibold !tracking-[-0.1] text-slate-900 md:text-4xl">
                {user.name}
            </h1>

            <p className="text-[15px] text-slate-500 md:text-base">
                @{user.username}
            </p>
        </div>
    );
}
