import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header
                className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase"
            >
                Header
            </header>
            <div className="flex flex-col md:flex-row flex-1">
                <Sidebar />
                <main className="flex-1">{children}</main>
            </div>
        </div>    
    );
}
  