import { useEffect, useState } from "react";
import { getPostById } from "../apis/postApis";
import { useFeed } from "../../../feed/context/FeedProvider";

export const usePostView = (postId) => {
    const [post, setPost] = useState(null);
    const { entities } = useFeed();
    const [loadingPost, setLoadingPost] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const exists = entities.posts[postId];

                if (exists) {
                    console.log("Exists");

                    const user = entities.users[exists.author];

                    const hydratedPost = { ...exists, author: user };

                    setPost(hydratedPost);
                    return;
                }

                const { data } = await getPostById(postId);

                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingPost(false);
            }
        };

        fetchPost();
    }, [postId, entities]);

    return { post, loadingPost };
};
