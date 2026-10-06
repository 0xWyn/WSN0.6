import { useEntities } from "../../global/EntityProvider";

export const useHydratePost = () => {
    const { entities } = useEntities();

    console.log("Hydrating POST");
    const hydratePost = (post) => {
        if (!post) return null;
        const hydratedPost = { ...post, author: entities.users[post.author] };

        return hydratedPost;
    };

    return { hydratePost };
};
