import { useAuth } from "../../../auth/context/AuthProvider";
import { RightBubble } from "./ChatBubbles";

export default function MessageCard({ message, position }) {
    const { user } = useAuth();
    const alignRight = message.sender === user._id.toString();
    console.log(message);
    return (
        <div
            className={`relative flex ${alignRight ? "justify-end" : "justify-start"}`}
        >
            <RightBubble
                content={message.text}
                media={message.media}
                alignRight={alignRight}
                position={position}
            />
            <div className="absolute top-full mt-1.5 tracking-wide px-2 text-[11px] text-slate-400">
                12:42 PM
            </div>
        </div>
    );
}
