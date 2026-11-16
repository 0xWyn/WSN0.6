import ClanEntity from "./ResultCards/ClanEntity";
import CommentEntity from "./ResultCards/CommentEntity";
import PostEntity from "./ResultCards/PostEntity";
import UserEntity from "./ResultCards/UserEntity";

export default function ResultSection({ section, elements }) {
    const Components = {
        clans: ClanEntity,
        users: UserEntity,
        posts: PostEntity,
        comments: CommentEntity,
    };

    return (
        <section className="rounded-[32px] border border-white/60 bg-white/30 backdrop-blur-2xl p-8 space-y-2 flex-1 w-full">
            <h1 className="uppercase tracking-wide font-[11px] font-bold text-slate-700">
                {section}
            </h1>

            <div className="mt-2 rounded-[14px] p-2 space-y-3">
                {elements.map((el) => {
                    const Component = Components[section];
                    console.log(Component);
                    return (
                        <div key={el._id}>
                            <Component entity={el}></Component>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
