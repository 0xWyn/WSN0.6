import { useEntities } from "../features/global/EntityProvider";

export const useFetchEntity = (scope, _id) => {
    const { entities } = useEntities();

    console.log(scope, _id);
    const entity = entities?.[scope]?._id;

    console.log(entity);
    return entity;
};
