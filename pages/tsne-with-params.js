import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Suspense } from 'react'
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'

import LoadingSpinner from "../src/components/LoadingSpinner";
import TsneParamsInput from '../src/components/TsneParam'
import DownloadButton from "../src/components/DownloadButton";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const makePathParams = (params) => {
    console.log(params);
    return (`n_components=${params.n_components}&perplexity=${params.perplexity}&early_exaggeration=${params.early_exaggeration}`
            +`&learning_rate=${params.learning_rate}&n_iter=${params.n_iter}&n_iter_without_progress=${params.n_iter_without_progress}`
            +`&init=${params.init}&verbose=${params.verbose}&angle=${params.angle}`
            )
}

function Images() {
    const [img, setImg] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let url;
    let body = {
        n_components: 2,
        perplexity: 30.0,
        early_exaggeration: 12.0,
        learning_rate: "auto",
        n_iter: 1000,
        n_iter_without_progress: 300,
        init: "pca",
        angle: 0.5
    }
    const [params, setParams] = useState(body);
    let tsne_parameter = makePathParams(params)

    // t-SNE เมื่อเข้าที่หน้าเพจ
    // useEffect(() => {
    //     fetchImage(body)
    // }, []);

    useEffect(() => {
        console.log('params was changed', params);
    }, [params]);

    // const myLoader = ({ src, width, quality }) => {
    //     return `http://localhost:8000/predict/tsne-image2?${makePathParams(params)}`
    // }
    const fetchImage = useCallback(async (params) => {
        setIsLoading(true);
        // try {
        //     console.log('fetchImage with params:', parameter)
        //     const res = await fetch(`http://localhost:8000/tsne/tsne-visualize?${parameter}`, {
        //         method: 'GET',
        //         // headers: {'Content-Type': 'application/json', },
        //         // body: JSON.stringify(body)
        //     })
        //     .then(res => {
        //         console.log(res);
        //         return res.blob();
        //     })
        //     .then(data => {
        //         console.log('data', data)
        //         url = window.URL.createObjectURL(data)           
        //         setImg(url)
        //         setIsLoading(false);
        //         console.log('url:', url)
        //     })
        // } 
        // catch(err) {
        //     setImg('/')
        //     setIsLoading(false);
        //     console.log('Error', err);
        //     return err
        // }

        // try {
        //     console.log('fetchImage with params:', parameter)
        //     console.log("params", JSON.stringify(params))
        //     const res = await fetch(`http://localhost:8000/tsne/tsne-visualize`, {
        //         method: 'POST',
        //         // headers: {'Content-Type': 'application/json', },
        //         body: JSON.stringify(params)
        //     })
        //     .then(res => {
        //         console.log(res);
        //         return res.blob();
        //     })
        //     .then(data => {
        //         console.log('data', data)
        //         url = window.URL.createObjectURL(data)           
        //         setImg(url)
        //         setIsLoading(false);
        //         console.log('url:', url)
        //     })
        // } 
        // catch(err) {
        //     setImg('/')
        //     setIsLoading(false);
        //     console.log('Error', err);
        //     return err
        // }

        try {
            console.log("body:", params)
            const response = await axios.post('http://localhost:8000/tsne/tsne-visualize', params, { responseType:"blob" })
                                        // .then((res) => {console.log(res)});
            // response.blob()
            console.log('response', response)
            var reader = new window.FileReader();
            reader.readAsDataURL(response.data); 
            reader.onload = function() {
                var url = reader.result;
                setImg(url)
            }
            // url = window.URL.createObjectURL(response)           
            setIsLoading(false);
            console.log('url:', url)

        } catch (error) {
            setImg('/')
            console.error(error);
            setIsLoading(false);
        }
      
    }, []);

    // const handleParamChange = (e) => {
    //     // setIsSubmit(false);
    //     const change = e.target.name;
    //     const values = e.target.value;
    //     console.log(change, values);
    //     if (change === "n_components") { setParams({...params, n_components:values}); }
    //     else if (change === "perplexity") { setParams({...params, perplexity:values}); }
    //     else if (change === "early_exaggeration") { setParams({...params, early_exaggeration:values}); }
    //     else if (change === "learning_rate") { setParams({...params, learning_rate:values}); }
    //     else if (change === "n_iter") { setParams({...params, n_iter:values}); }
    //     else if (change === "n_iter_without_progress") { setParams({...params, n_iter_without_progress:values}); }
    //     else if (change === "init") { setParams({...params, init:values}); }
    //     else if (change === "verbose") { setParams({...params, verbose:values}); }
    //     else if (change === "angle") { setParams({...params, angle:values}); }
    // };
    const handleParamChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setParams((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const handleSubmit = async () => {
        console.log('Submit custom parameter input form')
        // setIsSubmit(false);
        tsne_parameter = makePathParams(params);
        console.log(tsne_parameter)
        await fetchImage(params);
        // setTimeout(() => {
        // setIsSubmit(true);
        // }, 1000);
        console.log('finish submit');
    }
    
    const renderImage = (
        <div>
            <Image
                src={img}
                alt="T-SNE Projection"
                width={500}
                height={500}
            />
        </div>
    )

    return (
        <div className="bg-fuchsia-50 p-2 h-full">
            <Head>
                <title>t-SNE visualization</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='flex gap-4 '>
            <div className='border hover:bg-gray-200'><Link href="/" >Back</Link></div>
                <div>T-SNE</div>
            </div>
            
            <TsneParamsInput props={params} handleChange={handleParamChange} handleSubmit={handleSubmit}></TsneParamsInput>
            
            <div className='flex justify-center items-center'>
                {isLoading ? <LoadingSpinner /> : renderImage}
            </div>

            {/* {isSubmit ? 
                // <Image
                //     loader={myLoader}
                //     src="/loading-gif.gif"
                //     alt="T-SNE Projection"
                //     width={500}
                //     height={500}
                // />
                <Image
                    // loader={myLoader}
                    src={img}
                    alt="T-SNE Projection"
                    width={500}
                    height={500}
                />
            :
                <></>
            } */}

            {/* <button onClick={() => handleDownload()}>download</button> */}
            <DownloadButton></DownloadButton>
        </div>
    )
}

export default Images;
  