import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

const menuItems = [
    {
        href: '/tsne-img',
        title: 'T-SNE',
    },
    {
        href: '/umap-img',
        title: 'UMAP',
    },
    {
        href: 'http://localhost:8000/predict/data-after-perform-model',
        title: 'data after t-sne',
    },
    // {
    //     href: '/test-upload2',
    //     title: 'Upload',
    // },
];

function Sidebar() {
    const [status, setStatus] = useState("");

    useEffect(() => {
       const uploadForm = document.querySelector('.upload')
       // const dialogText = document.querySelector('#dialog')
 
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault()
            let file = e.target.uploadFile.files[0]
            let formData = new FormData()
            formData.append('file', file)
            fetch('http://localhost:8000/upload-file', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                }
                else {
                    setStatus("success")
                    console.log('upload success !')
                    console.log(data)
                }
            })
        })
    })
 
    return (
        <div className="bg-fuchsia-100 w-60">
            <form className="upload m-2">
                <input type="file" name="uploadFile" required />
                    <br/><br/>
                <input type="submit" className="w-12 hover:bg-violet-600 border-4  bg-white"/> 
            </form>    
            {status==="success" ? (<div className="m-2">Upload Successful !</div>) 
                : 
                (<div className='hidden'></div>)
            }    

            <nav>
                <ul>
                {menuItems.map(({ href, title }) => (
                    <li className='m-2' key={title}>
                    <Link href={href}>
                        <a
                            className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer`}
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
