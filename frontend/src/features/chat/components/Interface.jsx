// // MI is linked to from routes with chatID
// import { useParams } from "react-router-dom";
// import ErrorState from "../../../components/ui/ErrorState";
// import FullscreenLoader from "../../../components/ui/FullscreenLoader";
// import LocNav from "../../../components/ui/LocNav";
// import { useChatting } from "../hooks/useChatting";
import { Header } from "./Header";
// import InputBar from "./InputBar";
// export default function MessageInterface() {
//     const { id } = useParams();

//     const { chat, messages, loading } = useChatting(id);

//     const receiver =
//         chat?.receiver ||
//         chat?.participants?.find(
//             (participant) => participant?._id !== user?._id
//         );

//     if (loading)
//         return (
//             <div className="flex h-full w-full items-center justify-center">
//                 <FullscreenLoader />
//             </div>
//         );

//     if (!loading && !(chat || messsages))
//         return (
//             <div className="flex h-full w-full items-center justify-center">
//                 <ErrorState />
//             </div>
//         );

//     return (
//         <div className="flex flex-col min-h-0">
//             <div className="flex border-b border-gray-200">
//                 <LocNav current="Chats" />
//             </div>
//             <div className="flex h-full min-h-0 w-full flex-col rounded-3xl bg-slate-100">
//                 <div className="flex flex-col min-h-0 rounded-3xl shadow-sm border border-gray-100 bg-white">
//                     {/* Header */}
//                     <Header receiver={receiver} />
//                     {/* Container */}
//                     <div className="flex flex-1 min-h-0 flex-col px-5 py-4">
//                         <MessageContainer />
//                     </div>
//                     <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 rounded-b-3xl">
//                         <InputBar />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import MContainer from "./MContainer";
import MInput from "./MInput";
export default function MInterface() {
    return (
        // Screen
        <div className="relative h-full w-full flex flex-col min-h-0 rounded-b-[28px] overflow-x-hidden bg-[#f8fafc]">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 size-72 md:size-[34rem] rounded-full bg-amber-100/40 blur-3xl" />

                <div className="absolute bottom-0 right-0 size-64 md:size-[28rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>
            <Header />
            {/* Main */}
            <div className="relative flex w-full h-full min-h-0 flex-col items-center gap-2 overflow-hidden rounded-b-[28px] border border-slate-200/40 border-t-transparent px-4">
                {/* Container */}
                <MContainer />

                <MInput />
            </div>
        </div>
    );
}
