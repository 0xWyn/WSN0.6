import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout() {
    return (
        <div className="md-flex-row flex flex-col flex-col-reverse w-screen min-w-sm h-screen items-stretch gap-2 p-2 bg-white overflow-x-scroll border">
            <NavigationBar />
            <div className="flex-1 min-w-0 w-full overflow-y-auto ">
                <Outlet />
            </div>
        </div>
    );
}
