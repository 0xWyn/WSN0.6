import { useCurrentUser } from "../../../auth/hooks/useCurrentUser";
import { usePostActions } from "../../../feed/hooks/usePostActions";
import { useComments } from "../hooks/useComments";

export default function CommentMenu({ comment }) {
    const { removeComment } = useComments();
    const auth = useCurrentUser();
    const isAuthor = auth?._id === comment.author._id;

    const options = {
        Delete: {
            permission: isAuthor,
            action: () => removeComment(comment._id),
            // removeComment(comment._id),
        },
    };

    return (
        <div className="flex min-w-32 flex-col gap-1">
            {Object.entries(options).map(
                ([key, value]) =>
                    value.permission && (
                        <button
                            key={key}
                            onClick={value.action}
                            className={`!px-3 !py-2 !rounded-xl text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 active:bg-blue-900/30 active:text-slate-100 duration-300`}
                        >
                            {key}
                        </button>
                    )
            )}
        </div>
    );
}
