import CreateComment from "./CreateComment";
import Container from "./Container";
import { useFeed } from "../../../feed/context/FeedProvider";
import { useComments } from "../hooks/useComments";

export default function CommentSection({ post }) {
    const { queries } = useFeed();

    const commentIds = queries.commentsByPost[post._id] || [];

    return (
        <section className="border-t border-slate-200/70 w-full rounded-md flex flex-col gap-3 px-7 py-6 sm:px-8 backdrop-blur-xl ">
            <div className="flex w-full items-end mt-6 text-slate-700 gap-4">
                <h1 className="text-2xl font-medium ml-1.5">Comments</h1>

                <p className="text-xl">{post.replies.length}</p>
            </div>
            <CreateComment postId={post._id} />
            <Container postId={post._id} />
        </section>
    );
}
