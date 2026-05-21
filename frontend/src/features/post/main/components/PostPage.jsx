import { useParams } from "react-router-dom";
import CommentSection from "../../comments/components/CommentSection";
import { usePostView } from "../hooks/usePostView";
import PostCard from "./PostCard";

export default function PostPage({}) {
    const { id } = useParams();
    const { post, loadingPost } = usePostView(id);
    if (loadingPost) return <div>Loading...</div>;
    return (
        <div className="h-full w-full bg-slate-100 rounded-md flex flex-col items-center">
            <div className="w-full max-w-2xl h-full flex flex-col gap-2 items-center p-2">
                <PostCard post={post} />
                <CommentSection post={post} />
            </div>
        </div>
    );
}
