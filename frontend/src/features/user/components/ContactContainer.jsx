import UserEntity from "../../explore/components/ResultCards/UserEntity";

export default function ContactContainer({ entities }) {
    return (
        <div className="space-y-2 mt-6 px-6 rounded-[20px] flex-1 flex flex-col items-center">
            {Object.values(entities).map((entity) => {
                return <UserEntity key={entity._id} entity={entity} />;
            })}
        </div>
    );
}
