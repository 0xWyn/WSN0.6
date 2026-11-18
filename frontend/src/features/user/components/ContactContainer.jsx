import UserEntity from "../../explore/components/ResultCards/UserEntity";

export default function ContactContainer({ entities }) {
    return (
        <div className="space-y-2">
            {Object.values(entities).map((entity) => {
                return <UserEntity key={entity._id} entity={entity} />;
            })}
        </div>
    );
}
