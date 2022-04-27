import React, {useContext} from "react"; // useContext is a hook for Transaction Context
import { AiFillAlipayCircle } from "react-icons/ai";
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import {Loader} from './';
import { TransactionContext} from "../context/TransactionContext"; // import Transaction Context
import { shortenAddress } from "../utils/shortenAddress"; //shortend address for card

const commonStyles='min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

//Input component
const Input=({placeholder, name, type, value, handleChange})=>(
    <input placeholder={placeholder} type={type} step="0.0001" value={value} onChange={(e)=>handleChange(e,name)} className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"/>
);

const Welcome=()=> {

    //Calling function from TransactionContext for connecting wallet
    const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading}= useContext(TransactionContext); 

    // Functional component used in button in input(under the card)
    const handleSubmit=(e)=> {
        const { addressTo, amount, keyword, message } = formData; //destructuring form fields
        e.preventDeafault; // usually when you submit the form the page reoads, this prevents that from happening
        if(!addressTo || !amount ||!keyword || !message) return; // check if all fields are entered

        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            	
                <div className="flex mf:flex-row flex-col items-start jusify-between md:p-20 py-12 px-4" >
                    
                    {/* Devider for: Text in center, Description in center, Button,Table */}
                    <div className="flex flex-1 justify-start flex-col mf:mr-10">
                            {/* Text in center */}
                            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                                Send Crypto <br /> across the world
                            </h1>
                            {/* Description in center */}
                            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                                Explore crypto world. Buy and sell cryptocurrencies easly on Krypoto.
                            </p>
                            {/* Button, render only if there is no current account*/}

                            {!currentAccount && (<button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                <p className="text-white text-base font-semibold">Connect Wallet</p>
                            </button>)}
                            
                            {/* Table, using commonSytles*/}
                            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                                <div className={`rounded-tl-2xl ${commonStyles}`}>
                                    Reliabilty
                                </div>
                                <div className={commonStyles}>
                                    Security
                                </div>
                                <div className={`rounded-tr-2xl ${commonStyles}`}>
                                    Ethereum
                                </div>
                                <div className={`rounded-bl-2xl ${commonStyles}`}>
                                    Web 3.0
                                </div>
                                <div className={commonStyles}>
                                    Low fees
                                </div>
                                <div className={`rounded-br-2xl ${commonStyles}`}>
                                    Blockchain
                                </div>
                            </div>
                    </div>

                    {/* Right part of welcome component, ETH card*/}
                    <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                        
                        {/* Wrapper for a card */}
                        <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
                            <div className="flex justify-between flex-col w-full h-full">
                                
                                <div className="flex justify-between items-start">
                                    {/* Etherium logo */}
                                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum fontSize={21} color="#fff"/>
                                    </div>
                                    {/* i icon */}
                                    <BsInfoCircle fontSize={17} color="fff"/>
                                </div>

                                <div>
                                    {/* eth address */}
                                    <p className="text-white font-light text-sm">
                                        
                                    {shortenAddress(currentAccount)}

                                        
                                    </p>
                                    {/* etherium*/}
                                    <p className="text-white font-semibold text-lg mt-1">
                                       
                                    </p>
                                </div>
                            </div>
                        </div> 

                        {/*Fields under the card wrapper*/}
                        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                           {/* Using Input componet */}
                           <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/> 
                           <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                           <Input placeholder="Key word (Gif)" name="keyword" type="text" handleChange={handleChange}/>
                           <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>

                           <div className="h-[1px] w-full bg-gray-400 my-2"/>

                        {/* Loader */}
                           {isLoading ? 
                           (<Loader/>)
                           :
                           (<button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">Send Now</button>) 
                           }

                        </div>





                    </div>




                </div>
        </div>
    );
}

export default Welcome;