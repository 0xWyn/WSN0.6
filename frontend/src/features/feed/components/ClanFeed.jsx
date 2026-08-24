import { useParams } from "react-router-dom";
import { useFeed } from "../context/FeedProvider";
import { useFeedPosts } from "../hooks/useFeedPosts";
import { useFeedSocket } from "../socket/useFeedSocket";
import PostContainer from "./PostContainer";

export default function ClanFeed() {
    const { id } = useParams();

    useFeedSocket(id);

    const { queries } = useFeed();

    return <PostContainer posts={queries?.postsByClan?.[id] || []} />;
}
