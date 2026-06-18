import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import SlickNav from "./SlickNav";

export default function Layout() {
    return (
        <div className="md-flex-row flex w-screen min-w-sm h-screen items-stretch gap-2 p-2 bg-white overflow-x-scroll border">
            <SlickNav />
            <div className="flex-1 min-w-0 w-full h-full overflow-y-auto ">
                <Outlet />
            </div>
        </div>
    );
}
