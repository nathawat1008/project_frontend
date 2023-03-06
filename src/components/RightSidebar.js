import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

const menuItems = [
    // {
    //     href: '/tsne-img',
    //     title: 'T-SNE',
    //     params: {n_comp: 2,
    //              perplexity: 30},
    // },
    {
        href: '/tsne-with-params',
        title: 'T-SNE ',
    },
    {
        href: '/umap-with-params',
        title: 'UMAP',
    },
    // {
    //     href: '/data-after',
    //     title: 'data after t-sne',
    // },
];

function Sidebar() {
    // const [fileName, setFileName] = useState("");

    return (
        <div className="bg-fuchsia-100 w-full sm:w-60">

            <nav>
                <ul>
                    {menuItems.map(({ href, title }) => (
                        <li className='m-2' key={title}>
                        <Link href={href}>
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

export default Sidebar;
