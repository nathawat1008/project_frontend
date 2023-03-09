import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Suspense } from 'react'
import { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from "../src/components/LoadingSpinner";
import axios from 'axios'

import UmapParamsInput from '../src/components/UmapParam'
import DownloadButton from "../src/components/DownloadButton";
import Error from "../public/error_icon.svg"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const makePathParams = (params) => {
    console.log('make param', params);
    return `n_components=${params.n_components}&n_neighbors=${params.n_neighbors}&metric=${params.metric}`
            +`&learning_rate=${params.learning_rate}&n_epochs=${params.n_epochs}&min_dist=${params.min_dist}`
            +`&init=${params.init}&spread=${params.spread}&low_memory=${params.low_memory}&transform_seed=${params.transform_seed}`
}

function Images() {
    const [img, setImg] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("wait");
    const [timeUse, setTimeUse] = useState();

    let st, et;
    let url;
    let body = {
        n_neighbors: 15,
        n_components: 2,
        metric: "euclidean",
        n_epochs: 200,
        learning_rate: 1.0,
        init: "spectral",
        min_dist: 0.1,
        spread: 1.0,
        low_memory: true,
        transform_seed: 42,
        // verbose: 1
    }
    const [params, setParams] = useState(body);
    // let umap_parameter = makePathParams(params)

    // useEffect(() => {
    //     fetchImage(params)
    // }, []);

    useEffect(() => {
        console.log('params was changed', params);
        // umap_parameter = makePathParams(params)
    }, [params]);

    // const myLoader = ({ src, width, quality }) => {
    //     return `http://localhost:8000/umap/predict/umap-image?${makePathParams(params)}`
    // }
    const fetchImage = useCallback(async (params) => {
        setIsLoading(true);
        // try {
        //     console.log('fetchImage with params:', parameter)
        //     const res = await fetch(`http://localhost:8000/umap/umap-visualize?${parameter}`, {
        //         method: 'GET',
        //     })
        //     .then(res => {return res.blob();})
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
            const response = await axios.post('http://localhost:8000/umap/umap-visualize', params, { responseType:"blob" })
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
            setStatus("success")
        } catch (error) {
            setImg('/')
            console.error(error);
            setIsLoading(false);
            setStatus("fail");
        }
    }, []);

    const handleParamChange = (e) => {
        // setIsSubmit(false);
        const change = e.target.name;
        let values = e.target.value;
        console.log(change, values, Number(values));        
        // if (values === null) {
        //     console.log()
        //     values = null
        // }
        if (change === "n_components") { setParams({...params, n_components:values}); }
        else if (change === "n_neighbors") { setParams({...params, n_neighbors:parseInt(values)}); }
        else if (change === "metric") { setParams({...params, metric:values}); }
        else if (change === "learning_rate") { setParams({...params, learning_rate:values}); }
        else if (change === "n_epochs") { setParams({...params, n_epochs:parseInt(values)}); }
        else if (change === "min_dist") { setParams({...params, min_dist:values}); }
        else if (change === "init") { setParams({...params, init:values}); }
        else if (change === "spread") { setParams({...params, spread:values}); }
        else if (change === "low_memory") { setParams({...params, low_memory:values}); }
        else if (change === "transform_seed") { setParams({...params, transform_seed:values}); }
    };
    // const handleParamChange = (event) => {
    //     const { name, value } = event.target;
    //     setParams((prevState) => ({ ...prevState, [name]: value }));
    // };

    const handleSubmit = async () => {
        console.log('Submit custom parameter input form')
        // setIsSubmit(false);
        // umap_parameter = makePathParams(params);
        // console.log(umap_parameter)
        setTimeUse(0);
        st = Date.now();
        await fetchImage(params);
        et = Date.now();
        setTimeUse((et-st)/1000);
        // setTimeout(() => {
        // setIsSubmit(true);
        // }, 1000);
        console.log("time use: ", timeUse ,"s");
        console.log('finish submit');
    }
    
    const renderImage = (
        <div>
            <Image
                src={img}
                alt="UMAP Projection"
                width={500}
                height={500}
            />
        </div>
    )
    const errorImage=
        (<div className='flex justify-center items-center gap-2'>
            <Image
                src={Error}
                alt="Error"
                width={50}
                height={50}
            />
            <span className='text-lg text-red-600'>Something went wrong! Please try again.</span>
        </div>)
    const waitForTsne = 
        (<div className='flex items-center h-[350px]'>
            <span className='text-lg'>Waiting for submit UMAP</span>
        </div>)

    return (
        <div className="bg-fuchsia-50 p-2 h-full">
            <Head>
                <title>UMAP visualization</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex gap-2 items-center">
                <div className='font-bold text-xl'>UMAP</div>
                <Popup trigger={<div className="flex items-center justify-center w-4 h-4 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                            position="right center">
                            <div className="p-1">
                                    <div className="text-lg font-bold flex justify-center">UMAP</div>
                                    <div>To see more about this: <a href='https://umap-learn.readthedocs.io/en/latest/api.html' className='text-blue-500 underline'>UMAP Guide</a></div>
                            </div>
                </Popup>    
            </div>

            <UmapParamsInput props={params} handleChange={handleParamChange} handleSubmit={handleSubmit}></UmapParamsInput>
            
            <div className='flex justify-center items-center'>
                {isLoading ? <LoadingSpinner /> : status==="success" ? renderImage : status==="fail" ? errorImage : status==="wait" ? waitForTsne: <></>}
            </div>
            
            <div className='flex justify-between items-center'>
                <DownloadButton isDisable={status==="success" ? false : true}></DownloadButton>
                {timeUse ? <div className='text-sm'>time use: {timeUse} s.</div> : <></> }
            </div>
        </div>
    )
}

export default Images;
  