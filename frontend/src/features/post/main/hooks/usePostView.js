import { useEffect, useState } from "react";
import { useEntities } from "../../../global/EntityProvider";
import { getPostById } from "../apis/postApis";

export const usePostView = (postId) => {
    const [post, setPost] = useState(null);
    const { entities } = useEntities();
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

                console.log("Exists, but still hitting this");
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
