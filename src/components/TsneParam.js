import { useState,useEffect } from "react"
import Image from "next/image";
// import { Collapse } from '@nextui-org/react';
import {Collapse} from 'react-collapse';

import hamburger from '../../public/hamburger-menu-icon.svg';
import arrowDown from '../../public/arrow-down-icon.svg';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function TsneParamsInput({ props, handleChange, handleSubmit }) {
        const [ collapse, setCollapse ] = useState(false);
        const [ isDisable, setIsDisable ] = useState(false);

        useEffect(() => {
                console.log("props.learning_rate", props.learning_rate)
                if (isNaN(props.learning_rate) && props.learning_rate !== "auto"){
                        setIsDisable(true);
                }
                else {
                        setIsDisable(false);
                }
        },[props.learning_rate]);

        return (
        <div className="w-1/2 min-w-[500px]">
            <button onClick={() => setCollapse(!collapse)} className="m-2 flex justify-center items-center gap-2">
                <span className=" text-lg font-bold">Custom T-SNE Parameters</span>
                <Image src={arrowDown} alt="arrowDown" width={20} height={15}></Image>
            </button>

            <Collapse isOpened={collapse}>
                <form className="grid grid-cols-3 gap-2 ml-2 mb-4">
                        <label for="n_components">n_components</label>
                        <select id="n_components" name="n_components" className="input-box" value={props.n_components}
                                // onChange={(e) => {e.preventDefault(); handleChange(); }}
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

                        <label for="perplexity">perplexity</label>
                        <input type="number" id="perplexity" name="perplexity" className="input-box" step="any" value={props.perplexity}
                                onChange={handleChange}></input>
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">perplexity</div>
                                <div >The perplexity is related to the number of nearest neighbors that is used in other manifold learning algorithms. Larger datasets usually require a larger perplexity. Consider selecting a value between 5 and 50.</div>
                        </div>
                        </Popup>    

                        <label for="early_exaggeration">early_exaggeration</label>
                        <input type="number" id="early_exaggeration" name="early_exaggeration" className="input-box" value={props.early_exaggeration}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange(); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">early_exaggeration</div>
                                <div >Controls how tight natural clusters in the original space are in the embedded space and how much space will be between them</div>
                        </div>
                        </Popup>    

                        <label for="learning_rate">learning_rate</label>
                        <input type="text" id="learning_rate" name="learning_rate"  className="input-box" value={props.learning_rate}
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange(); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">learning_rate</div>
                                <div >range [10.0, 1000.0]  the learning rate is too high, the data may look like a ‘ball’ with any point approximately equidistant from its nearest neighbours. If the learning rate is too low, most points may look compressed in a dense cloud with few outliers</div>
                        </div>
                        </Popup>    

                        <label for="n_iter">n_iter</label>
                        <input type="number" id="n_iter" name="n_iter" className="input-box" value={props.n_iter} step="1"
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange(); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">n_iter</div>
                                <div >Maximum number of iterations for the optimization. Should be at least 250.</div>
                        </div>
                        </Popup>    

                        <label for="n_iter_without_progress">n_iter_without_progress</label>
                        <input type="number" id="n_iter_without_progress" name="n_iter_without_progress" className="input-box" value={props.n_iter_without_progress} step="1"
                                onChange={handleChange}></input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange(); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">n_iter_without_progress</div>
                                <div >Maximum number of iterations without progress before we abort the optimization, used after 250 initial iterations with early exaggeration.</div>
                        </div>
                        </Popup>    

                        <label for="init">init</label>
                        <select type="text" id="init" name="init" className="input-box" value={props.init} placeholder="random or pca"
                                onChange={handleChange}
                        >
                                {/* onChange={(e) => {e.preventDefault(); handleChange(); }}> */}
                                <option value="pca">pca</option>
                                <option value="random">random</option>
                        </select>
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">init</div>
                                <div >Initialization of embedding. PCA initialization cannot be used with precomputed distances and is usually more globally stable than random initialization.</div>
                        </div>
                        </Popup>    

                        {/* <label for="verbose">verbose</label>
                        <input type="number" id="verbose" name="verbose" className="input-box" value={props.verbose}
                                onChange={(e) => {e.preventDefault(); handleChange("verbose",e.target.value); }}></input>
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">Data Limitation</div>
                                <div >The data used must be numerical data that have less than 1000 dimension </div>
                        </div>
                        </Popup>     */}

                        <label for="angle">angle</label>
                        <input type="number" id="angle" name="angle" className="input-box" value={props.angle}
                                onChange={handleChange}>        
                        </input>
                                {/* onChange={(e) => {e.preventDefault(); handleChange(); }}></input> */}
                        <Popup trigger={<div className="flex items-center justify-center w-5 h-5 mt-1 rounded-full border bg-white hover:bg-gray-200 cursor-pointer">?</div>} 
                        position="right center">
                        <div className="p-1">
                                <div className="text-lg font-bold flex justify-center">angle</div>
                                <div >Range of 0.2 - 0.8. The angular size of a distant node as measured from a point, Angle less than 0.2 has quickly increasing computation time and angle greater 0.8 has quickly increasing error</div>
                        </div>
                        </Popup>    
                        
                </form>
                </Collapse>
                {isDisable === true ? <div className="mx-2 text-red-600">learning_rate value should be auto or Number.</div> : <div></div>}
                <input type="submit" className="m-2 p-1 rounded border-2 bg-white hover:bg-fuchsia-400 enabled:hover:text-white enabled:hover:cursor-pointer disabled:bg-gray-300" 
                        onClick={(e) => {e.preventDefault(); handleSubmit();}} value="Visualize" disabled={isDisable}></input>

        </div>
        )
}