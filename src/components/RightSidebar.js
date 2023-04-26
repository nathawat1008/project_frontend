import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

const menuItems = [
    {
        href: '/tsne-with-params',
        title: 'T-SNE ',
    },
    {
        href: '/umap-with-params',
        title: 'UMAP',
    },

];

function RightSidebar({ isDisable }) {
    // const [fileName, setFileName] = useState("");
    useEffect(() => {
        console.log("isDisable from Rightsidebar:", isDisable)
    }, [isDisable]);

    return (
        <div className="bg-fuchsia-100 w-full sm:w-60">

            <nav>
                <ul>
                    {menuItems.map(({ href, title }) => (
                        <li className='m-2' key={title}>
                        <Link href={{
                                pathname: href,
                                // query: {disable: isDisable},
                            }}>
                            <a
                                className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 hover:text-white cursor-pointer`}
                            >
                            {title}
                            </a>
                        </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};    

export default RightSidebar;
