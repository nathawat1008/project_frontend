import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const [isDisable, setIsDisable] = useState();
    useEffect(() => {
        console.log("isDisable from labyout:", isDisable)
    },[isDisable]);
    return (
        <div className="min-h-screen flex flex-col">
            <header
                className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase z-[999]"
            >
                High Dimensional Data Visualization application
            </header>
            <div className="flex flex-col md:flex-row flex-1">
                <Sidebar isDisable={setIsDisable}/>
                <main className="flex-1">{children}</main>
                <RightSidebar isDisable={isDisable}/>
            </div>
        </div>    
    );
}
  