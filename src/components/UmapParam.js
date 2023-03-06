import { useState,useEffect } from "react"
import Image from "next/image";
// import { Collapse } from '@nextui-org/react';
import {Collapse} from 'react-collapse';

import hamburger from '../../public/hamburger-menu-icon.svg';
import arrowDown from '../../public/arrow-down-icon.svg';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function UmapParamsInput({ props, handleChange, handleSubmit }) {
    const [ collapse, setCollapse ] = useState(false);
    console.log(props)

    return (
        <div className="w-1/2 min-w-[500px]">
            <button onClick={() => setCollapse(!collapse)} className="m-2 mb-0">
                <span className="mx-2 text-lg font-bold">Custom UMAP Parameters</span>
                <Image src={arrowDown} alt="arrowDown" width={20} height={15}></Image>
            </button>

            <Collapse isOpened={collapse}>
                <form className="grid grid-cols-3 gap-2 ml-2 mb-4">
                        <label for="n_components">n_components</label>
                        <select type="number" id="n_components" name="n_components" className="input-box" value={props.n_components}
                                // {/* onChange={(e) => {e.preventDefault(); handleChange("n_components",e.target.value); }} */}
                                onChange={handleChange}
                        >
                                <option value="2">2</option>
                                <option value="3">3</option>
 
                        </select>
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">n_components</div>
                                <div >Dimension of the embedded space.</div>
                        </div>
                        </Popup> 

                        <label for="n_neighbors">n_neighbors</label>
                        <input type="number" id="n_neighbors" name="n_neighbors" className="input-box" value={props.n_neighbors}
                                onChange={handleChange}/>        
                                {/* onChange={(e) => {e.preventDefault(); handleChange("n_neighbors",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">n_neighbors</div>
                                <div className="">The size of local neighborhood (in terms of number of neighboring sample points) used for manifold approximation. Larger values result in more global views of the manifold, while smaller values result in more local data being preserved. In general values should be in the range 2 to 100.</div>
                        </div>
                        </Popup>      

                        <label for="min_dist">min_dist</label>
                        <input type="number" id="min_dist" name="min_dist" className="input-box" value={props.min_dist}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("min_dist",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">min_dist</div>
                                <div >The effective minimum distance between embedded points. Smaller values will result in a more clustered/clumped embedding where nearby points on the manifold are drawn closer together, while larger values will result on a more even dispersal of points</div>
                        </div>
                        </Popup>      


                        <label for="learning_rate">learning_rate</label>
                        <input type="number" id="learning_rate" name="learning_rate"  className="input-box" value={props.learning_rate}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("learning_rate",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">learning_rate</div>
                                <div >The initial learning rate for the embedding optimization.</div>
                        </div>
                        </Popup>      

                        <label for="metric">metric</label>
                        <input type="text" id="metric" name="metric" className="input-box" value={props.metric}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("metric",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">metric</div>
                                <div >The metric to use to compute distances in high dimensional space.</div>
                        </div>
                        </Popup>      

                        <label for="n_epochs">n_epochs</label>
                        <input type="number" id="n_epochs" name="n_epochs" className="input-box" value={props.n_epochs}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("n_epochs",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">n_epochs</div>
                                <div >The number of training epochs to be used in optimizing the low dimensional embedding. Larger values result in more accurate embeddings. If None is specified a value will be selected based on the size of the input dataset (200 for large datasets, 500 for small).</div>
                        </div>
                        </Popup>      

                        <label for="init">init</label>
                        <input type="text" id="init" name="init" className="input-box" value={props.init} placeholder="random or pca"
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("init",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">init</div>
                                <div >How to initialize the low dimensional embedding. Options are: ‘spectral’ , ‘random’ , ‘pca’ , A numpy array of initial embedding positions.</div>
                        </div>
                        </Popup>      

                        <label for="spread">spread</label>
                        <input type="number" id="spread" name="spread" className="input-box" value={props.spread}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("spread",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">spread</div>
                                <div >The effective scale of embedded points. In combination with min_dist this determines how clustered/clumped the embedded points are.</div>
                        </div>
                        </Popup>      

                        <label for="low_memory">low_memory</label>
                        <input type="select" id="low_memory" name="low_memory" className="input-box" value={props.low_memory}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("low_memory",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">low_memory</div>
                                <div >For some datasets the nearest neighbor computation can consume a lot of memory. If you find that UMAP is failing due to memory constraints consider setting this option to True.</div>
                        </div>
                        </Popup>      

                        <label for="transform_seed">transform_seed</label>
                        <input type="number" id="transform_seed" name="transform_seed" className="input-box" value={props.transform_seed}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange("transform_seed",e.target.value); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">transform_seed</div>
                                <div >Random seed used for the stochastic aspects of the transform operation. This ensures consistency in transform operations.</div>
                        </div>
                        </Popup>      

                        <input type="submit" className="mt-2 border-2 bg-white hover:bg-fuchsia-400 hover:text-white hover:cursor-pointer" 
                                onClick={(e) => {e.preventDefault(); handleSubmit();}} value="Submit"></input>
                </form>
            </Collapse>

        </div>
    )
}