import HeartLucide from "../../../components/icons/heart-lucide";
import { RSS } from "../../../components/icons/rss";
import { TextQuote } from "../../../components/icons/text-quote";
import PostContainer from "../../feed/components/PostContainer";
import { useFeed } from "../../feed/context/FeedProvider";
import { useFeedRoom } from "../../feed/socket/useFeedRoom";
import { useFeedSocket } from "../../feed/socket/useFeedSocket";

export default function UserFeed({ userId }) {
    const { queries } = useFeed();

    useFeedRoom("user", userId);
    useFeedSocket();

    const posts = queries.postsByUser?.[userId] ?? [];

    const buttons = {
        posts: {
            title: "Posts",
            stat: posts.length,
            icon: RSS,
        },
        replies: {
            title: "Replies",
            stat: 0,
            icon: TextQuote,
        },
        likes: {
            title: "Likes",
            stat: 0,
            icon: HeartLucide,
        },
    };
    return (
        <div className="">
            <div className="flex justify-around items-center my-2 rounded-[12px] py-2 px-3 backdrop-blur-sm gap-3">
                {Object.values(buttons).map((button) => {
                    const Icon = button.icon;

                    return (
                        <button
                            key={button.title}
                            className="font-semibold tracking-tight text-slate-900 border border-white/60 bg-white/80 backdrop-blur-md rounded-[12px] py-2 px-3 shadow-xs w-full flex items-center justify-center gap-2"
                        >
                            <span className="text-slate-500 !font-normal border rounded-md p-1 border-slate-200 bg-slate-100">
                                <Icon size={14} />
                            </span>
                            <span>
                                {button.title}
                                <span className="text-slate-500 !font-normal ml-1 text-sm -mb-1">
                                    {button.stat}
                                </span>
                            </span>
                        </button>
                    );
                })}
                {/* <button className="font-semibold tracking-tight text-slate-900 border border-white/60 bg-white/80 backdrop-blur-md rounded-[12px] py-2 px-3 shadow-xs w-full">
                    <span>
                        <RSS />
                    </span>
                    Posts
                    <span className="text-sm text-slate-400 font-normal ml-1">
                        {posts.length}
                    </span>
                </button>

                <button className="font-semibold tracking-tight text-slate-900 border border-white/60 bg-white/80 backdrop-blur-md rounded-[12px] py-2 px-3 shadow-xs w-full">
                    <span>
                        <TextQuote />
                    </span>{" "}
                    Replies
                </button>

                <button className="font-semibold tracking-tight text-slate-900 border border-white/60 bg-white/80 backdrop-blur-md rounded-[12px] py-2 px-3 shadow-xs w-full">
                    <span>
                        <HeartLucide />
                    </span>{" "}
                    Likes
                </button> */}
            </div>

            <section className="w-full p-8 border border-white/70 rounded-[28px] bg-white/20 backdrop-blur-xl">
                {/* Preamble */}

                <PostContainer posts={posts} />
            </section>
        </div>
    );
}
