import { useAuth } from "../../../auth/context/AuthProvider";
import { usePostActions } from "../../../feed/hooks/usePostActions";

export default function PostMenu({ post }) {
    const { handleDeletePost } = usePostActions();
    const { user: auth } = useAuth();
    const isAuthor = auth?._id === post.author._id;
    const options = ["Edit", "Delete"];
    const actions = {
        Edit: () => {
            console.log("Clicked editing for:", post);
        },
        Delete: () => {
            handleDeletePost(post._id);
        },
    };
    return (
        <div className="flex min-w-32 flex-col gap-1">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={actions[option]}
                    className={`!px-3 !py-2 !rounded-xl text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 active:bg-blue-900/30 active:text-slate-100 duration-300 ${(option === "Edit" || option === "Delete") && !isAuthor ? "hidden" : ""}`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
