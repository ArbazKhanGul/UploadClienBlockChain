import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from 'web3';
import Txc  from 'ethereumjs-tx';
import axios from "axios";
import Binance from "node-binance-api";
import supply from "./supply.json"
import ABI from "./ABI.json";
import { func } from 'prop-types';
const common = require('ethereumjs-common');
var Tx=require("ethereumjs-tx").Transaction;
const binance = new Binance()

// let Tx=Txc.Transaction;
function Detail() {

    const {detailtype}=useParams();

console.log(detailtype);

const [privatekeyserver, setprivatekeyserver] = useState("");
const [formDataServer, setformDataServer] = useState([])
    const [page, setpage] = useState(false)
    const [receiverAddress, setreceiverAddress] = useState("");
const [checkFee, setcheckFee] = useState(false)
const [checkmetamask, setcheckmetamask] = useState(false);
const [hash, sethash] = useState("");

    async function callAboutPage(){
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/detailtype`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                detailtype
              }),

            });
    
      
            const data = await res.json();
            console.log(data);
      
            if (data.stat === "fail") {
                throw new Error("Invalid Login");
            }
            
            const storetemp=data.formaccepted[0];
            console.log(storetemp)
            setformDataServer(storetemp);
         setpage(true)
    // console.log(allUSersData)
          
            
          } catch (err) {
              
            console.log(err)
              
        }
    
    
        }
    
        useEffect(() => {
          beforeverify();
          callAboutPage();
        }, []);

        

        // airdrop

        const beforeverify=async ()=>{
               
          try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getreceiveraddress`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
          
          
            const data = await res.json();
            console.log(data)
          
            
            if(data.receive=="error"){
              throw new Error("Server error");
            }
    
          
          setreceiverAddress(data.receive.receiveraddress);
          setprivatekeyserver(data.receive.privatekey)
          

          
          } catch (err) {
              console.log(err)
            toast.error("Some error occurring in getting Receiver Address please try later")
              
          }
          
            }
       
            let web3;

async function getAccount() {
  
  let address;

  // console.log(receiverAddress);
    if (window.ethereum) { //check if Metamask is installed

      web3=new Web3(window.ethereum);

      try {
              await window.ethereum.enable(); //connect Metamask
                            
              
              toast.success("MetaMask Connected Successfully");
              toast.warn("Please make sure your metamask is connected to BSC Network If it not connected then connect them with BSC Chain");
              setcheckmetamask(true);
           
          } catch (error) {

            toast.error("🦊 Error coming in connecting your metamask Please check your metamask")
        return;
            
          }
          
    } else {
      toast.error("🦊 You must install Metamask into your browser: https://metamask.io/download.html");
   return;     
        } 


        
  };

let accounts;

 async function paymentSend(){


let percentcalculate=(formDataServer.totaltokenssend/100)
let dollargive=15/formDataServer.tokenprice;
let totalvalue=percentcalculate+dollargive;

console.log("I am printing total vlue after addittion"+totalvalue);

  const web32 =new Web3(`https://data-seed-prebsc-1-s3.binance.org:8545/`);
  const tokenInst = new web32.eth.Contract(ABI, formDataServer.contractadress);
  const balance = await tokenInst.methods.balanceOf(`${receiverAddress}`).call()  
  let balancevalue = web32.utils.fromWei(balance, "ether");
  console.log("I am telling balance in account"+balancevalue);

  
if(balancevalue<totalvalue)
{
  toast.error("Not enough coin avialable for claim")
  return;
}

  let ticker = await binance.prices();
  console.info(`Price of BNB: ${ticker.BNBUSDT}`);

  let price=ticker.BNBUSDT;
  let coin=(1/price)*7;
  console.log(coin)
coin =coin.toFixed(6);
  console.log(coin);

  console.log(receiverAddress);
  
  const web3=new Web3(window.ethereum);
  let  clientaccounts=await web3.eth.getAccounts();
  console.log("Printing client account "+clientaccounts[0]);

  let  temp = web3.utils.toWei(coin, "ether");
console.log(temp)
    var rawTransaction = {
      "from": `${clientaccounts[0]}`,
      "to":`${receiverAddress}`,
      "chainId": `97`,
      "value": `${temp}`      
  };
   
   try{
     console.log("Sending")
     toast.success("After confirm please wait for sometime untill payment send")
     let has=await web3.eth.sendTransaction(rawTransaction)
  toast.success("Fee send successfully")
  console.log(has);

if(has.transactionHash){
  setcheckFee(true);
  setcheckmetamask(false);
}
  sethash(has.transactionHash)
  console.log(hash)
   }
   catch(error){
  toast.error("Error comming in sending fee")
    console.log(error)
   };
  
  

  }





async function claimAirDrop(temp){


    let  clientaddress=new Web3(window.ethereum);
    let  clientaccounts=await clientaddress.eth.getAccounts();
    console.log("Printing client account "+clientaccounts[0]);

    async function sendOnlyone() {
      
      


    var myAddress = `${receiverAddress}`;

    var toAddress=`${clientaccounts[0]}`

    var Tx = require('ethereumjs-tx').Transaction;
    var Web3 = require('web3');
    var web3 = new Web3('https://data-seed-prebsc-1-s3.binance.org:8545/');
 
var valueGiven=formDataServer.tokenprice;
console.log(valueGiven)

var val=parseInt(15/valueGiven);

console.log("above the utils")
    let decimals = web3.utils.toBN(18);
    let amount2 = web3.utils.toBN(val);
    val = amount2.mul(web3.utils.toBN(10).pow(decimals));
  
  // val=web3.utils.toWei(val);
  console.log(val);

// let  amount=val;
    var amount = web3.utils.toHex(val);

    var privateKey = Buffer.from(`${privatekeyserver}`,'hex');
    
    console.log("printing contract address"+temp)
    var contractAddress = `${temp}`; // ONLYONE address
    var contract = new web3.eth.Contract(supply, contractAddress, {from: myAddress});
    var Common = require('ethereumjs-common').default;
    var BSC_FORK = Common.forCustomChain(
        'mainnet',
        {
        name: 'Binance Smart Chain Mainnet',
        networkId: 97,
        chainId: 97,
        url: 'https://data-seed-prebsc-1-s3.binance.org:8545/'
        },
        'istanbul',
    );

    var count = await web3.eth.getTransactionCount(myAddress);
    console.log("printing address"+myAddress+"and cpint"+count)
//count=count+1;
    var rawTransaction = {
        "from":myAddress,
        "gasPrice":`0x00000002540BE400`,
        "gasLimit":web3.utils.toHex(210000),
        "to":contractAddress,"value":"0x0",
        "data":contract.methods.transfer(toAddress, amount).encodeABI(),
        "nonce":web3.utils.toHex(count)
    };

    var transaction = new Tx(rawTransaction, {'common':BSC_FORK});
    transaction.sign(privateKey)

    toast.success("Sending Please wait for some time");
    var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    console.log(result);
if(result.transactionHash){
  setcheckFee(false);
  setcheckmetamask(true);
  alert(`Air drop claim successfully Please add this contract in your add token ${temp}`)
}
  }
sendOnlyone();
}


    return (
        <>
         {page?  <div className="m-3" >

         <div  className="buttonClass">
        <button   onClick={getAccount}  type="button" className="mb-2 mt-2 btn btn-primary">
               Connect MetaMask 
              </button>
<button type="button"  onClick={paymentSend} className="mt-2 mb-2 btn btn-primary marginLeft" disabled={checkmetamask?null:"disabled"}>
  Send Fee
</button>
<button type="button"  className="mt-2  mb-2 btn btn-primary marginLeft" onClick={()=>{
claimAirDrop(formDataServer.contractadress)
}} disabled={checkFee?null:"disabled"}>
  Claim Airdrop
</button>
</div>
               <div>
                   <h1>
                       Project Name
                   </h1>
                   <h3 className="text-secondary">{formDataServer.projectname}</h3>
                   <h1 className="mt-3">Project Description</h1>
                   <p> {formDataServer.projectdescription} </p>
              <h1>Social Links</h1>
              <li className="detaillist">Whitepaer:  <span>{formDataServer.whitepaper}</span> </li>
              <li className="detaillist">Telegram:  <span>{formDataServer.telegram}</span> </li>
              <li className="detaillist">Discord:  <span>{formDataServer.discord}</span> </li>
              <li className="detaillist">Twitter:  <span>{formDataServer.twitter}</span> </li>
              <li className="detaillist">Medium:  <span>{formDataServer.medium}</span> </li>
              
               </div>
               </div> : <h1>Loading...</h1>}
               <ToastContainer position="top-center"></ToastContainer>
        </>
    )
}

export default Detail;
