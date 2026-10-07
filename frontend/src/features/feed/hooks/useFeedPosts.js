import { useRef, useState } from "react";
import { useSetEntities } from "../../global/EntityProvider";
import { fetchPost, getClanPosts, getUserPosts } from "../api/feedApis";
import { useFeed } from "../context/FeedProvider";
import { normalisePosts } from "../utils/normaliseEntities";
import { updatePostsQuery } from "../utils/updateQueries";

export const useFeedPosts = () => {
    const { setEntities } = useSetEntities();
    const { setQueries, setFeedLoad } = useFeed();

    const fetchClanPosts = async (page = 1, clanId) => {
        try {
            setFeedLoad((prev) => ({ ...prev, clan: true }));
            const { data } = await getClanPosts(page, clanId);
            setEntities((prev) => normalisePosts(data, prev));

            setQueries((prev) => updatePostsQuery(data, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setFeedLoad((prev) => ({ ...prev, clan: false }));
        }
    };

    const fetchUserPosts = async (page = 1, userId) => {
        try {
            setFeedLoad((prev) => ({ ...prev, user: true }));
            const { data } = await getUserPosts(userId, page);

            setQueries((prev) => updatePostsQuery(data, prev));

            setEntities((prev) => normalisePosts(data, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setFeedLoad((prev) => ({ ...prev, user: false }));
        }
    };

    const fetchSinglePost = async (postId) => {
        try {
            setFeedLoad((prev) => ({ ...prev, single: true }));

            const { data } = await fetchPost(postId);

            setEntities((prev) => normalisePosts([data], prev));
        } catch (error) {
            console.error(error.response);
        } finally {
            setFeedLoad((prev) => ({ ...prev, single: false }));
        }
    };

    return {
        fetchClanPosts,
        fetchUserPosts,
        fetchSinglePost,
    };
};
