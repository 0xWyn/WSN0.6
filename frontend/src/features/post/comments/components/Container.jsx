import { useState } from "react";
import { useComments } from "../hooks/useComments";
import CommentCard from "./CommentCard";

export default function Container({ postId }) {
    const { commentIds, commentsById } = useComments(postId);

    const mappedComments = commentIds.map((id) => (
        <div key={id}>
            <CommentCard comment={commentsById[id]} />
        </div>
    ));

    return (
        <div className="w-full rounded-md border border-gray-400 flex flex-col gap-2 h-full">
            {mappedComments.length > 0 ? (
                mappedComments
            ) : (
                <div className="flex w-full h-full justify-center items-center">
                    <p className="text-gray-400">Ain't no comments</p>
                </div>
            )}
        </div>
    );
}
