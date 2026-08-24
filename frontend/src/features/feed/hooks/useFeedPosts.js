import { useEffect, useState } from "react";
import { useEntities } from "../../global/EntityProvider";
import { useEntityActions } from "../../global/useEntityActions";
import { fetchPost, getClanPosts, getUserPosts } from "../api/feedApis";
import { useFeed } from "../context/FeedProvider";
import { normalisePosts } from "../utils/normaliseEntities";
import { updatePostsQuery } from "../utils/updateQueries";

export const useFeedPosts = () => {
    const [loadingFeedPosts, setLoadingFeedPosts] = useState({
        clanPosts: false,
        userPosts: false,
        singlePost: false,
    });

    const { entities, setEntities } = useEntities();
    const { queries, setQueries } = useFeed();

    const fetchClanPosts = async (page = 1, clanId) => {
        try {
            setLoadingFeedPosts((prev) => ({ ...prev, clanPosts: true }));
            const { data } = await getClanPosts(page, clanId);

            setEntities((prev) => normalisePosts(data, prev));

            setQueries((prev) => updatePostsQuery(data, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFeedPosts((prev) => ({ ...prev, clanPosts: false }));
        }
    };

    const fetchUserPosts = async (page = 1, userId) => {
        try {
            setLoadingFeedPosts((prev) => ({ ...prev, userPosts: true }));
            const { data } = await getUserPosts(userId, page);

            const ids = data.map((post) => post._id);
            setQueries((prev) => updatePostsQuery(data, prev));

            setEntities((prev) => normalisePosts(data, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFeedPosts((prev) => ({ ...prev, userPosts: false }));
        }
    };

    const fetchSinglePost = async (postId) => {
        try {
            setLoadingFeedPosts((prev) => ({ ...prev, singlePost: true }));

            if (!entities.posts[postId]) {
                console.log("fetchingPost");
                const { data } = await fetchPost(postId);

                setEntities((prev) => normalisePosts([data], prev));
            }
        } catch (error) {
            console.error(error.response);
        } finally {
            setLoadingFeedPosts((prev) => ({ ...prev, singlePost: false }));
        }
    };

    return {
        fetchClanPosts,
        fetchUserPosts,
        fetchSinglePost,
        loadingFeedPosts,
    };
};
