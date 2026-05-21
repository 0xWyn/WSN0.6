import { useState } from "react";
import EngagementBar from "../../../engagement/components/EngagementBar";
import Avatar from "../../../user/components/Avatar";
import { Author, Text } from "../../gen/Gen";
import { useReplies } from "../hooks/useReplies";
import ReplyCard from "./ReplyCard";
import CreateComment from "./CreateComment";

export default function CommentCard({ comment }) {
    const { author, text } = comment;
    const [open, setOpen] = useState(false);

    const { replyIds, repliesById, loading } = useReplies(
        open ? comment._id : null
    );

    const mappedReplies = replyIds.map((id) => (
        <div key={id}>
            <ReplyCard reply={repliesById[id]} />
        </div>
    ));

    const handleCommentClick = () => {
        setOpen((prev) => !prev);
    };
    return (
        <div className="w-full h-full">
            <div className="w-full bg-white shadow-sm p-4 px-10 flex flex-col rounded-md relative">
                <div className="flex flex-col z-1 w-full pointer-events-none">
                    <div className="flex gap-2">
                        <div className="flex justify-center items-center outline-1 rounded-full shrink-0 size-10">
                            <Avatar size={10} user={author} />
                        </div>
                        <div className="flex flex-col">
                            <Author author={author} />
                            <Text text={text} />
                        </div>
                    </div>
                    <EngagementBar
                        value={comment}
                        type="comment"
                        onCommentClick={handleCommentClick}
                    />
                </div>
            </div>

            {open && (
                <div className="flex flex-col h-full w-full p-4">
                    <CreateComment
                        postId={comment.parentPost}
                        parentComment={comment._id}
                    />
                    {loading && <div>Loading...</div>}

                    {!loading && replyIds.length > 0 ? (
                        <div className="flex flex-col gap-1 ml-10">
                            {mappedReplies}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-400">No replies yet</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
