import CreateComment from "./CreateComment";
import Container from "./Container";

export default function CommentSection({ post }) {
    return (
        <div className="w-full h-full rounded-md flex flex-col gap-4 p-10 shadow-sm bg-white">
            <CreateComment postId={post._id} parentComment={null} />
            <Container postId={post._id} />
        </div>
    );
}
