import { Header } from "./Header";
import MContainer from "./MContainer";
import MInput from "./MInput";
import { useChatting } from "../../hooks/useChatting";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function MInterface() {
    const { chat, messages, loading } = useChatting(useParams().id);

    return (
        // Screen
        <div className="relative h-full w-full flex flex-col min-h-0 rounded-b-[28px] overflow-hidden bg-[#f8fafc]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 size-72 md:size-[34rem] rounded-full bg-amber-100/40 blur-3xl" />

                <div className="absolute bottom-0 right-0 size-64 md:size-[28rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>
            <Header receiver={chat?.receiver} />
            {/* Main */}
            <div className="relative flex w-full h-full min-h-0 flex-col items-center gap-2 overflow-hidden rounded-b-[28px] border border-slate-200/40 border-t-transparent px-4">
                {/* Container */}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <MContainer messages={messages} chat={chat} />

                        <MInput />
                    </>
                )}
            </div>
        </div>
    );
}
