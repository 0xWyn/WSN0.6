import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Main() {
    return (
        <div className="flex w-screen min-w-sm h-screen items-stretch gap-2 p-2 bg-white overflow-x-scroll">
            <NavigationBar />
            <div className="flex-1 min-w-0 w-full overflow-y-auto ">
                <Outlet />
            </div>
        </div>
    );
}
