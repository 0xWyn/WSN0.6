import { Outlet } from "react-router-dom";
import { useClanSocket } from "../socket/useClanSocket";

export default function ClanPage() {
    useClanSocket();

    return <Outlet />;
}
