import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header
                className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase z-[999]"
            >
                High Dimensional Data Visualization
            </header>
            <div className="flex flex-col md:flex-row flex-1">
                <Sidebar />
                <main className="flex-1">{children}</main>
                <RightSidebar className=""/>
            </div>
        </div>    
    );
}
  