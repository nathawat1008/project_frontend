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
    let umap_parameter = makePathParams(params)

    useEffect(() => {
        fetchImage(umap_parameter)
    }, []);

    useEffect(() => {
        console.log('params was changed', params);
        // umap_parameter = makePathParams(params)
    }, [params]);

    // const myLoader = ({ src, width, quality }) => {
    //     return `http://localhost:8000/umap/predict/umap-image?${makePathParams(params)}`
    // }
    const fetchImage = useCallback(async (parameter) => {
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

        } catch (error) {
            setImg('/')
            console.error(error);
            setIsLoading(false);
        }
      


    }, []);

    // const handleChange = (change, values) => {
    //     // setIsSubmit(false);
    //     // console.log(change, values);
    //     if (values === null) {
    //         console.log()
    //         values = null
    //     }
    //     if (change === "n_components") { setParams({...params, n_components:values}); }
    //     else if (change === "n_neighbors") { setParams({...params, n_neighbors:values}); }
    //     else if (change === "metric") { setParams({...params, metric:values}); }
    //     else if (change === "learning_rate") { setParams({...params, learning_rate:values}); }
    //     else if (change === "n_epochs") { setParams({...params, n_epochs:values}); }
    //     else if (change === "min_dist") { setParams({...params, min_dist:values}); }
    //     else if (change === "init") { setParams({...params, init:values}); }
    //     else if (change === "spread") { setParams({...params, spread:values}); }
    //     else if (change === "low_memory") { setParams({...params, low_memory:values}); }
    //     else if (change === "transform_seed") { setParams({...params, transform_seed:values}); }
    // };
    const handleParamChange = (event) => {
        const { name, value } = event.target;
        setParams((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log('Submit custom parameter input form')
        // setIsSubmit(false);
        umap_parameter = makePathParams(params);
        console.log(umap_parameter)
        await fetchImage(umap_parameter);
        // setTimeout(() => {
        // setIsSubmit(true);
        // }, 1000);
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

    return (
        <div className="bg-fuchsia-50 p-2 h-full">
            <Head>
                <title>UMAP visualization</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='flex gap-4 '>
            <div className='border hover:bg-gray-200'><Link href="/" >Back</Link></div>
                <div>UMAP</div>
            </div>
            <UmapParamsInput props={params} handleChange={handleParamChange} handleSubmit={handleSubmit}></UmapParamsInput>

            {isLoading ? <LoadingSpinner /> : renderImage}
            <DownloadButton></DownloadButton>

        </div>
    )
}

export default Images;
  