export default function Identity({ user }) {
    return (
        <div className="min-w-0">
            <h1 className="text-2xl truncate font-semibold tracking-tight text-slate-900 md:text-3xl py-1">
                {user.name}
            </h1>

            <p className="mt-0.5 truncate text-sm text-slate-500">
                @{user.username}
            </p>
        </div>
    );
}
