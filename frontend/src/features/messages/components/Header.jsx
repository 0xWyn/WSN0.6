import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../../components/icons/arrow-left";
import { ChatActions } from "./ChatActions";
import { Identity } from "./Identity";

export const Header = ({ receiver }) => {
    const navigate = useNavigate();
    return (
        <header className="relative w-full flex items-center gap-4 border-b border-white bg-white/40 backdrop-blur-3xl px-5 py-4">
            <div
                onClick={() => navigate("..")}
                className="size-10 p-2 rounded-2xl flex items-center justify-center hover:cursor-pointer"
            >
                <ArrowLeft />
            </div>

            <div className="w-full flex justify-between">
                <div className="relative">
                    <Identity receiver={receiver} />

                    <div className="absolute inset-0 rounded-full bg-sky-200/20 blur-3xl pointer-events-none z-0" />
                </div>
                <ChatActions />
            </div>
        </header>
    );
};
