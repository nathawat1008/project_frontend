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

function Sidebar({ isDisable }) {
    const [status, setStatus] = useState("");
    const [list, setList] = useState([]);
    const [dataAttr, setDataAttr] = useState([]);
    const [isHoverHelpButton, setIsHoverHelpButton] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [dataInfo, setDataInfo] = useState();
    const [isNull, setisNull] = useState();
    // const [fileName, setFileName] = useState("");

    const getLabelClass = async () => {
        try{
            await fetch('http://localhost:8000/get-data-detail', {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                console.log("data:", data);
                // setSelectedOption(data.payload)
                setDataAttr(data.all_class);
                setSelectedOption(dataAttr[0]);
                setDataInfo(data.shape);
                setisNull(`${data.isNull}`);
                isDisable(data.isNull);
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // (async () => {
        //     await getLabelClass();
        // })
        try{
            fetch('http://localhost:8000/get-data-detail', {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                console.log("data:", data);
                // setSelectedOption(data.payload)
                setDataAttr(data.all_class);
                setSelectedOption(dataAttr[0]);
                setDataInfo(data.shape);
                setisNull(`${data.isNull}`);
                isDisable(data.isNull);
            })
        }
        catch(e) {
            console.log(e);
        }

    }, []);

    // useEffect(() => {
    //     const actualBtn = document.getElementById('uploadFile');
    
    //     const fileChosen = document.getElementById('fileChosen');
        
    //     actualBtn.addEventListener('change', function(){
    //         console.log(this.file)
    //         setFileName(this.file[0].name)
    //     })

    //     const uploadForm = document.querySelector('.upload')

    //     uploadForm.addEventListener('submit', function(e) {
    //         e.preventDefault()
    //         let file = e.target.uploadFile.files[0]
    //         let formData = new FormData()
    //         formData.append('file', file)
    //         fetch('http://localhost:8000/upload-file', {
    //             method: 'POST',
    //             body: formData
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.errors) {
    //                 alert(data.errors);
    //             }
    //             else {
    //                 setStatus("success");
    //                 setList([...list, data.filename]);
    //                 setDataAttr(data.attr); 
    //                 setDataInfo(data.shape);
    //                 console.log('upload success !');
    //                 console.log(data);
    //             }
    //         })
    //         .catch(err => {
    //             setStatus("fail");
    //             console.log("Upload fail!");
    //             console.log(err);
    //         })
    //     })
    // })

    useEffect(() => {
        console.log('file list', list);
    }, [list])

    const uploadFile = async (file) => {
        console.log("upload file", file);
        const formData = new FormData();
        formData.append('file', file);
      
        const res = await fetch('http://localhost:8000/upload-file', {
          method: 'POST',
          body: formData
        })            
        .then(res => res.json())
        .then(data => {
            isDisable(data.isNull);
            if (data.isNull) {
                setStatus("Contain Null")
                setisNull(`${data.isNull}`);
            }
            else{
                setStatus("success");
                setList([...list, data.filename]);
                setDataAttr(data.attr); 
                setDataInfo(data.shape);
                setisNull(`${data.isNull}`);
                console.log('upload success !');
                console.log(data);
            }
        })
        .catch(err => {
            setStatus("fail");
            console.log("Upload fail!");
            console.log(err);
        })

    }
      
    const handleMouseOverHelpButton = (e) => {
        console.log('hover');
        setIsHoverHelpButton(true);
    }
    const handleMouseOutHelpButton = (e) => {
        console.log('out');
        setIsHoverHelpButton(false);
    }
    const handleClickHelpButton = (e) => {
        e.preventDefault;
        console.log('Help button click')
    }
    const handleChangeSelectLabelAttr = async (e) => {
        e.preventDefault;
        console.log(e.target.value,);
        const body = {
            "attrName" : e.target.value,
        }
        try{
            await fetch('http://localhost:8000/label-class', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                // setStatus("success");
                // setList([...list, data.filename]);
                // setDataAttr(data.attr); 
                console.log('Change label attribute success !');
                console.log(data);
            })
        }
        catch (e) {
            setStatus("fail");
            console.log("Change label attribute fail!");

        }

    }
    useEffect(() => {
        console.log("isNull: ", isNull);
    }, [isNull]);

    return (
        <div className="bg-fuchsia-100 w-full sm:w-60">
  
            <nav>
                <ul>
                    <li>
                        <div className="flex m-2 bg-fuchsia-200 p-2 rounded">
                            <form className="upload" onSubmit={(e) => {e.preventDefault(); uploadFile(e.target.uploadFile.files[0]);}}>
                                <label for="uploadFile" className="flex flex-col gap-2  hover:cursor-pointer">
                                    <input type="file" id="uploadFile" name="uploadFile" className="cursor-pointer w-full" required /> 
                                    {/* <br/><br/> */}
                                    <input type="submit" value="upload" className=" border-2 rounded-md p-1 bg-white hover:bg-fuchsia-400 hover:text-white cursor-pointer"/> 
                                    
                                </label>
                                {status==="success" ? (<div className="m-2 text-green-500">Upload Successful !</div>) 
                                    : 
                                    status==="fail" ? (<div className='m-2 text-red-500'>Upload Fail !</div>)
                                    :
                                    status==="Contain Null" ? (<div className='m-2 text-red-500'>Data contain null value</div>)
                                    :
                                    (<div className="hidden"></div>)
                                }  
                                {/* <span id="fileChosen">No file chosen</span> */}
                            </form>  
                            <Popup trigger={<div className="flex items-center justify-center w-8 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer" 
                                    onClick={handleClickHelpButton}>?</div>} 
                                position="right center">
                                <div className="p-2">
                                    <div className="text-lg font-bold flex justify-center">Data Limitation</div>
                                    <div >The data used must be <b>Numerical data</b> that have less than 1000 dimension <b>without Null value</b></div>
                                </div>
                            </Popup>
                        </div>
                        <div className="m-2">
                            <div>Select Class Label </div>
                            <select id="label_class" name="label_class" className="input-box"
                                    onChange={(e) => {setSelectedOption(e.target.value); handleChangeSelectLabelAttr(e);}} value={selectedOption}>
                                {dataAttr.map((attr) => (
                                    <option >{attr}</option>
                                ))}
                            </select>
                        </div>
                        <div className="m-2">Number of Records: {dataInfo ? `${dataInfo[0]}` : "-" }</div>
                        <div className="m-2">Nudmber of Features: {dataInfo ? `${dataInfo[1]}` : "-" }</div>
                        <div className="m-2">Contain null value: {isNull ? isNull : ''}</div>
                        {/* <ul>
                            {dataAttr.map((attr) => (
                                <li>{attr}</li>
                            ))}
                        </ul> */}

                    </li>
                    {/* {menuItems.map(({ href, title }) => (
                        <li className='m-2' key={title}>
                        <Link href={href}>
                            <a
                                className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 hover:text-white cursor-pointer`}
                            >
                            {title}
                            </a>
                        </Link>
                        </li>
                    ))} */}
                </ul>
            </nav>
        </div>
    );
};    

export default Sidebar;
