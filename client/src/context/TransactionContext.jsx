//Smart contract that we are comunicating with is in contect folder, it already deployed on Block Chain
//Using react context API around our entire application that is serving purpose of conectiong to the blockchain
//Writing it on one cetralized place TransactionContext.jsx so no need writing it to every single component

import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers'; //ethers package
import { contractABI, contractAddress } from '../utils/constants';

//Creating React context(global variable for all react components)
export const TransactionContext = React.createContext();

// destructuing ethereum object from window.ethereum
const { ethereum }= window; 

//Creating function to fetch our etherium contract
const getEthereumContract = () => {
    const provider= new ethers.providers.Web3Provider(ethereum); //from package ethers
    const signer= provider.getSigner();
    const transactionContract= new ethers.Contract(contractAddress, contractABI, signer);//3 ingerdients from utils/constants
    
    return  transactionContract;
}

// Creating component to serve as Context Provider
export const TransactionProvider = ({children}) => {
    
    // use state field, field storing its value even if page refreshes
    const [currentAccount, setCurrentAccount] = useState(); //curent account
    const [formData, setFormData] = useState({addressTo:'', amount:'', keyword:'', message:''}); //form
    const [isLoading, setIsLoading]=useState(false);
    const [transactionCount, setTransactionCount]= useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions]= useState([]);

    // For form we need to hadnle the change, setting the form data
    const handleChange= (e,name) => {
        setFormData((prevState)=>({...prevState, [name]:e.target.value}));
    }

    const getAllTranactions= async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            
            const transactionContract = getEthereumContract();
            const availableTransactinos= await transactionContract.getAllTransaction();

            const structuredTransactions= availableTransactinos.map((transaction)=>({
                addressTo: transaction.reciver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10**18)
            }))
            setTransactions(structuredTransactions);
            console.log(structuredTransactions);
        } catch(error) {
            console.log(error);
        }
        
    }

    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
    
            getAllTranactions();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount= await transactionContract.getTransActionCount();
            window.localStorage.setItem("transactionCount", transactionCount); 
        }
        catch (error) {
            console.log("No eth object");
        }
    }

    // Connect wallet
    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("connect wallet");
        }
      };

    // Send Transaction
    const sendTransaction = async() => {
        try {
            // Check if user has metamask
            if(!ethereum) return alert("Please install metamask");
            //getting data from the form
            const { addressTo, amount, keyword, message } = formData;
            //getting eth contract 
            const transactionContract = getEthereumContract();
            //function to convert eth
            const parseAmount= ethers.utils.parseEther(amount);
           
            // now that we had connected metamask wallet, we can use eth_sendTransaction from window.ethereum 
            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas:'0x5208',//21 000 gwei
                    value: parseAmount._hex,
                }]
            });

            // calling addToBlockChain function from our SC with all the param that function needs (we store that transaction on our SC)
            const transactionHash= await transactionContract.addToBlockChain(addressTo, parseAmount, message, keyword);
            // Loading start
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`); //using hash of the the transaction called from our SC to blockchain
            await transactionHash.wait();
            //Loading ends
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            //Transaction count
            const transactionCount= await transactionContract.getTransActionCount();
            setTransactionCount(transactionCount.toNumber());

        } catch(error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    } 

    //Calling function, only once when app is loaded
    useEffect(()=>{
        checkIfWalletIsConnect();
        checkIfTransactionExists();
    }, [transactionCount])

    return(
        //Specifiynig what to value to pass and to whome
        <TransactionContext.Provider value={{ transactionCount, connectWallet, currentAccount, formData, setFormData, handleChange,sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}