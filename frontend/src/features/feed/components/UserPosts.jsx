import PostContainer from "./PostContainer";
import { useFeedPosts } from "../hooks/useFeedPosts";
import { useEffect } from "react";
import { usePostActions } from "../hooks/usePostActions";

export default function UserPosts({ userId }) {
    const { fetchUserPosts } = useFeedPosts();
    useEffect(() => {
        if (!userId) return;
        fetchUserPosts(userId, 1);
    }, [userId]);

    const { handleDeletePost } = usePostActions();

    const target = { type: "user", userId: userId };

    return (
        <div className="h-full w-full flex justify-center rounded-md p-2 bg-slate-100 overflow-y-auto border">
            <div className="h-full w-full max-w-2xl rounded-md flex flex-col items-center gap-4 ">
                <PostContainer target={target} onDelete={handleDeletePost} />
            </div>
        </div>
    );
}
