import Author from "../../gen/Author";
import Text from "../../gen/Text";
import Avatar from "../../../user/components/Avatar";
import EngagementBar from "../../../engagement/components/EngagementBar";

export default function ReplyCard({ reply }) {
    const { author, text, likes } = reply;
    return (
        <div
            className="w-full bg-white shadow-sm p-4 px-10 flex flex-col rounded-md relative"
            onClick={() => setOpen((prev) => !prev)}
        >
            <div className="flex flex-col z-1 w-full pointer-events-none">
                <div className="flex gap-2">
                    <div className="flex justify-center items-center outline-1 rounded-full shrink-0 size-10">
                        <ProfilePicture size={10} user={author} />
                    </div>
                    <div className="flex flex-col">
                        <Author author={author} />
                        <Text text={text} />
                    </div>
                </div>
                <EngagementBar value={reply} type="comment" />
            </div>
        </div>
    );
}
