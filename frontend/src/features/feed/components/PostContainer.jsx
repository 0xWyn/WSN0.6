import { useRef } from "react";
import { useEntities } from "../../global/EntityProvider";
import PostCard from "../../post/main/components/PostCard";
import { useHydratePost } from "../utils/useHydratePost";

export default function PostContainer({ posts }) {
    const { entities } = useEntities();

    const { hydratePost } = useHydratePost();

    const mappedPosts = posts.map((id) => (
        <PostCard key={id} post={hydratePost(entities.posts[id])} />
    ));

    return (
        <section className="flex w-full flex-col gap-5 h-full min-h-0">
            {mappedPosts}
        </section>
    );
}
